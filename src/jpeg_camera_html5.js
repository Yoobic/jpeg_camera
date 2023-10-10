import autoBind from 'auto-bind';
import JpegCameraBase, { addPrefixedStyle } from './jpeg_camera';
import { WebcamError, WebcamErrors } from './errors';

const canPlay = (type) => {
  const elem = document.createElement('video');
  return !!(elem.canPlayType && elem.canPlayType(type).replace(/no/, ''));
};

// JpegCamera implementation that uses _getUserMedia_ to capture snapshots,
// _canvas_element_ to display them and optionally _Web_Audio_API_ to play shutter sound.
//
// @private
export default class JpegCameraHtml5 extends JpegCameraBase {
  constructor(theContainer, options) {
    super(theContainer, options);
    this.statusChecksCount = 0;
    this.vorbisAudio = 'audio/ogg; codecs=vorbis';
    this.mpegAudio = 'audio/mpeg; ';
    this.message = null;
    this.videoContainer = null;
    this.stream = null;
    autoBind(this);
    this.engineInit();
  }

  destruct() {
    this.waitForVideoReadyTimer = null;
    if (this.video) {
      this.video.pause();
      this.video.src = '';
    }
    if (this.stream) {
      this.stream.getVideoTracks().forEach((track) => {
        track.stop();
      });
      this.stream.getAudioTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  static engineCheck = (success, failure) => {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && !canvas.toBlob) {
      failure('JpegCamera: Canvas-to-Blob is not loaded');
    }
    try {
      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          if (devices) {
            success();
          } else {
            failure();
          }
        })
        .catch(() => {
          failure();
        });
    } catch (err) {
      failure();
    }
  }

  engineInit() {
    this.debug('Using HTML5 engine.');

    this.message = document.createElement('div');
    this.message.class = 'message';
    this.message.style.width = '100%';
    this.message.style.height = '100%';
    addPrefixedStyle(this.message, 'boxSizing', 'border-box');
    this.message.style.overflow = 'hidden';
    this.message.style.textAlign = 'center';
    this.message.style.position = 'absolute';
    this.message.style.zIndex = 3;
    this.message.innerHTML = this.options.accessMessage;

    this.container.appendChild(this.message);

    this.videoContainer = document.createElement('div');
    this.videoContainer.style.overflow = 'hidden';
    this.videoContainer.style.position = 'absolute';
    this.videoContainer.style.zIndex = 1;

    this.container.appendChild(this.videoContainer);
    this.resizeVideoContainer();

    this.video = document.createElement('video');
    this.video.autoplay = true;
    this.video.setAttribute('playsinline', '')
    if (this.options.previewMirror) addPrefixedStyle(this.video, 'transform', 'scalex(-1.0)');

    if (window.AudioContext) {
      if (canPlay(this.vorbisAudio)) {
        this.loadShutterSound(this.options.shutterOggUrl);
      } else if (canPlay(this.mpegAudio)) {
        this.loadShutterSound(this.options.shutterMp3Url);
      }
    }

    const success =
      (stream) => {
        this.removeMessage();
        this.stream = stream;

        if (window.URL) {
          try {
            this.video.srcObject = stream;
          } catch (error) {
            this.video.src = URL.createObjectURL(stream);
          }
        } else {
          this.video.src = stream;
        }

        this.blockElementAccess();

        return this.waitForVideoReady();
      };

    navigator.mediaDevices.getUserMedia({
      video: {
        width: {
          min: 640,
          ideal: this.options.resolution,
        },
        deviceId: {exact: this.options.deviceId} 
      },
      audio: false,
    })
      .then((stream) => {
        if (!this.stream) {
          const tracks = stream.getVideoTracks();
          const settings = tracks[0].getSettings();
          this.debug(`Camera resolution ${settings.width}x${settings.height}px`);
          success(stream);
        }
      })
      .catch((error) => {
        this.message.innerHTML = '';
        throw new WebcamError(WebcamErrors.GET_MEDIA_FAILED_INIT, error);
      });
  }

  resizePreview() {
    this.resizeVideoContainer();
    this.resizeVideoBox();
  }

  resizeVideoContainer() {
    const verticalPadding = Math.floor(this.viewHeight * 0.2);
    const horizontalPadding = Math.floor(this.viewWidth * 0.2);
    this.message.style.paddingTop = `${verticalPadding}px`;
    this.message.style.paddingBottom = `${verticalPadding}px`;
    this.message.style.paddingLeft = `${horizontalPadding}px`;
    this.message.style.paddingRight = `${horizontalPadding}px`;
    this.videoContainer.style.width = `${this.viewWidth}px`;
    this.videoContainer.style.height = `${this.viewHeight}px`;
  }

  enginePlayShutterSound() {
    if (!this.shutterBuffer) { return null; }

    const source = this.audioContext.createBufferSource();
    source.buffer = this.shutterBuffer;
    source.connect(this.audioContext.destination);
    return source.start(0);
  }

  engineCapture(theSnapshot, mirror, quality, scale) {
    const snapshot = theSnapshot;
    const crop = this.getCaptureCrop();

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(crop.width * scale);
    canvas.height = Math.round(crop.height * scale);

    const context = canvas.getContext('2d');
    context.drawImage(this.video,
      crop.xOffset, crop.yOffset,
      crop.width, crop.height,
      0, 0,
      Math.round(crop.width * scale), Math.round(crop.height * scale));

    snapshot.canvas = canvas;
    snapshot.mirror = mirror;
    snapshot.quality = quality;

    return snapshot;
  }

  engineDisplay(snapshot) {
    if (this.displayedcanvas) {
      this.container.removeChild(this.displayedcanvas);
    }

    this.displayedcanvas = snapshot.canvas;
    this.displayedcanvas.style.width = `${this.viewWidth}px`;
    this.displayedcanvas.style.height = `${this.viewHeight}px`;
    this.displayedcanvas.style.top = 0;
    this.displayedcanvas.style.left = 0;
    this.displayedcanvas.style.position = 'absolute';
    this.displayedcanvas.style.zIndex = 2;
    if (this.options.previewMirror) addPrefixedStyle(this.displayedcanvas, 'transform', 'scalex(-1.0)');

    return this.container.appendChild(this.displayedcanvas);
  }

  engineGetCanvas(snapshot) {
    const canvas = document.createElement('canvas');
    canvas.width = snapshot.canvas.width;
    canvas.height = snapshot.canvas.height;
    const context = canvas.getContext('2d');
    context.drawImage(snapshot.canvas, 0, 0);
    return canvas;
  }

  engineGetImageData(snapshot) {
    const canvas = snapshot.canvas;
    const context = canvas.getContext('2d');
    return context.getImageData(0, 0, canvas.width, canvas.height);
  }

  engineGetBlob(snapshot, mime, mirror, quality, callback) {
    let canvas;
    if (mirror) {
      canvas = document.createElement('canvas');
      canvas.width = snapshot.canvas.width;
      canvas.height = snapshot.canvas.height;

      const context = canvas.getContext('2d');
      context.setTransform(1, 0, 0, 1, 0, 0); // reset transformation matrix
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(snapshot.canvas, 0, 0);
    } else {
      canvas = snapshot.canvas;
    }

    return canvas.toBlob((blob => callback(blob)), mime, quality);
  }

  engineDiscard(snapshot) {
    // eslint-disable-next-line no-param-reassign
    return delete snapshot.canvas;
  }

  engineShowStream() {
    if (this.displayedcanvas) {
      this.container.removeChild(this.displayedcanvas);
      this.displayedcanvas = null;
    }
    this.videoContainer.style.display = 'block';
    return null;
  }

  removeMessage() {
    this.message.style.display = 'none';
    return null;
  }

  loadShutterSound(url) {
    if (this.audioContext || !url) { return null; }

    this.audioContext = new AudioContext();

    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    const that = this;
    request.onload = () =>
      that.audioContext.decodeAudioData(
        request.response,
        (buffer) => {
          that.shutterBuffer = buffer;
        },
      )
    ;
    return request.send();
  }

  waitForVideoReadyTimer = null;
  waitForVideoReady() {
    const videoWidth = parseInt(this.video.videoWidth, 10);
    const videoHeight = parseInt(this.video.videoHeight, 10);

    if ((videoWidth > 0) && (videoHeight > 0)) {
      this.videoContainer.appendChild(this.video);

      this.videoWidth = videoWidth;
      this.videoHeight = videoHeight;

      this.video.style.position = 'relative';
      this.resizeVideoBox();

      return this.prepared(this.videoWidth, this.videoHeight);
    } else if (this.statusChecksCount > 100) {
      throw new WebcamError(WebcamError.CAMERA_NOT_READY);
    }
    this.statusChecksCount++;
    const that = this;
    this.waitForVideoReadyTimer = setTimeout((() => that.waitForVideoReady()), 100);
    return null;
  }

  resizeVideoBox() {
    const crop = this.getVideoCrop();
    this.video.style.width = `${crop.width}px`;
    this.video.style.height = `${crop.height}px`;
    this.video.style.left = `${crop.xOffset}px`;
    this.video.style.top = `${crop.yOffset}px`;
  }

  getVideoCrop() {
    let videoScale;
    const videoRatio = this.videoWidth / this.videoHeight;
    const viewRatio = this.viewWidth / this.viewHeight;

    if (videoRatio >= viewRatio) {
      // fill height, crop width
      this.debug('Filling height');
      videoScale = this.viewHeight / this.videoHeight;
      const scaledVideoWidth = Math.round(this.videoWidth * videoScale);

      return {
        width: scaledVideoWidth,
        height: this.viewHeight,
        xOffset: -Math.floor((scaledVideoWidth - this.viewWidth) / 2.0),
        yOffset: 0,
      };
    }
    // fill width, crop height
    this.debug('Filling width');
    videoScale = this.viewWidth / this.videoWidth;
    const scaledVideoHeight = Math.round(this.videoHeight * videoScale);

    return {
      width: this.viewWidth,
      height: scaledVideoHeight,
      xOffset: 0,
      yOffset: -Math.floor((scaledVideoHeight - this.viewHeight) / 2.0),
    };
  }

  getCaptureCrop() {
    const videoRatio = this.videoWidth / this.videoHeight;
    const viewRatio = this.viewWidth / this.viewHeight;

    if (videoRatio >= viewRatio) {
      // take full height, crop width
      const snapshotWidth = Math.round(this.videoHeight * viewRatio);

      return {
        width: snapshotWidth,
        height: this.videoHeight,
        xOffset: Math.floor((this.videoWidth - snapshotWidth) / 2.0),
        yOffset: 0,
      };
    }
    // take full width, crop height
    const snapshotHeight = Math.round(this.videoWidth / viewRatio);

    return {
      width: this.videoWidth,
      height: snapshotHeight,
      xOffset: 0,
      yOffset: Math.floor((this.videoHeight - snapshotHeight) / 2.0),
    };
  }
}
