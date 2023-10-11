(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JpegCamera"] = factory();
	else
		root["JpegCamera"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (self, options) {
	options = Object.assign({}, options);

	var filter = function filter(key) {
		var match = function match(pattern) {
			return typeof pattern === 'string' ? key === pattern : pattern.test(key);
		};

		if (options.include) {
			return options.include.some(match);
		}

		if (options.exclude) {
			return !options.exclude.some(match);
		}

		return true;
	};

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = Object.getOwnPropertyNames(self.constructor.prototype)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var key = _step.value;

			var val = self[key];

			if (key !== 'constructor' && typeof val === 'function' && filter(key)) {
				self[key] = val.bind(self);
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return self;
};

var excludedReactMethods = ['componentWillMount', 'render', 'componentDidMount', 'componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate', 'componentWillUnmount', 'componentDidCatch', 'setState', 'forceUpdate'];

module.exports.react = function (self, options) {
	options = Object.assign({}, options);
	options.exclude = (options.exclude || []).concat(excludedReactMethods);
	return module.exports(self, options);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPrefixedStyle = exports.isCanvasSupported = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _snapshot = __webpack_require__(5);

var _snapshot2 = _interopRequireDefault(_snapshot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isCanvasSupported = exports.isCanvasSupported = function isCanvasSupported() {
  return !!document.createElement('canvas').getContext;
};

// Helper for setting prefixed CSS declarations.
//
// @nodoc
// @private
var addPrefixedStyle = exports.addPrefixedStyle = function addPrefixedStyle(theElement, style, value) {
  var element = theElement;
  var uppercaseStyle = style.charAt(0).toUpperCase() + style.slice(1);
  element.style[style] = value;
  element.style['Webkit' + uppercaseStyle] = value;
  element.style['Moz' + uppercaseStyle] = value;
  element.style['ms' + uppercaseStyle] = value;
  element.style['O' + uppercaseStyle] = value;

  return element;
};

// Base class for JpegCamera implementations. Subclasses provide functionality
// defined by this API using different engines. On supported browsers HTML5
// implementation will be used, otherwise Flash will be used if available.

var JpegCameraBase = function () {
  _createClass(JpegCameraBase, [{
    key: 'canvasSupported',


    // Tells whether the browser supports `canvas` element and you can use
    // {Snapshot#getCanvas} method to display snapshots outside the camera
    // container.
    //
    // All browsers except Internet Explorer 8 and earlier support `canvas`
    // element.
    //
    // @return [Boolean] True if `canvas` is supported.


    // @nodoc
    // @private


    // @nodoc
    // @private


    // @nodoc
    // @private


    // @nodoc
    // @private
    value: function canvasSupported() {
      return isCanvasSupported();
    }

    // Construct new camera.
    //
    // JpegCamera will fill the entire container element. If the element's aspect
    // ratio is different than that of the camera stream (usually 4:3, but
    // sometimes 16:9) the stream will be clipped horizontally or vertically.
    //
    // To display the image on the client side the image might additionally get
    // resized to match container element, but the file sent to the server will
    // always be in camera's native resolution.
    //
    // By design the file sent to the server will only contain the area that was
    // visible to the user during capture. There is no way of sending unclipped,
    // full camera frame without showing the whole frame to the user.
    //
    // Resizing container after the camera has been initialized is not supported.
    //
    // Various options provided here can be overwritten when calling
    // {JpegCamera#capture capture} or {Snapshot#upload}.
    //
    // @param container [DOMElement, String] DOM element or element's ID.
    //
    // @option options swfUrl [String] URL to the SWF file that should be used
    //   for fallback if HTML5 cannot be used. '/jpeg_camera/jpeg_camera.swf' by
    //   default.
    // @option options shutterMp3Url [String] URL to the shutter mp3 sound file.
    //   Used by flash. '/jpeg_camera/shutter.mp3' by default.
    // @option options shutterOggUrl [String] URL to the shutter ogg sound file.
    //   Used by HTML5. '/jpeg_camera/shutter.ogg' by default.
    // @option options onReady [Function] Function to call when camera is ready.
    //   Inside the callback camera object can be accessed as `this`. This
    //   function will receive object with `videoWidth` and `videoHeight`
    //   properties as the first argument. These indicate camera's native
    //   resolution. See also {JpegCamera#ready}.
    // @option options onDebug [Function] This callback can be used to log various
    //   events and information that can be useful when debugging JpegCamera. Debug
    //   message will be passed as the first argument. Inside the callback camera
    //   object can be accessed as `this`. There is a default implementation of
    //   this callback that logs messages to window.console if available.
    // @option options resolution [Number] The horizontal resolution to ask camera for when
    //   initialising. Camera will be initialised at closest allowed horizontal resolution.
    // @option options quality [Float] Quality of the JPEG file that will be
    //   uploaded to the server. Should be between 0 and 1. 0.9 by default. Can be
    //   overwritten when calling {JpegCamera#capture capture}. _Cannot_ be
    //   overwritten at the time of upload.
    // @option options mirror [Boolean] The video stream and images displayed on
    //   the client side mimic a mirror, because that's how people are used to
    //   seeing themselves. By default images are uploaded to the server in their
    //   natural orientation - how the front facing camera sees the user.
    //   This option can be set to true to upload images the way the user sees
    //   them. Can be overwritten when calling {JpegCamera#capture capture}.
    //   _Cannot_ be overwritten at the time of upload.
    // @option options shutter [Boolean] Whether to play shutter sound when
    //   capturing snapshots. Can be overwritten when calling
    //   {JpegCamera#capture capture}.


    // @nodoc
    // @private


    // @nodoc
    // @private


    // @nodoc
    // @private


    // @nodoc
    // @private

    // @nodoc
    // @private

  }]);

  function JpegCameraBase(theContainer, options) {
    _classCallCheck(this, JpegCameraBase);

    this.defaultOptions = {
      shutterOggUrl: null,
      shutterMp3Url: null,
      swfUrl: null,
      onDebug: function onDebug(message) {
        // eslint-disable-next-line no-console
        if (console && console.log) {
          return console.log('JpegCamera: ' + message);
        }
        return null;
      },

      resolution: 3840,
      quality: 0.9,
      shutter: true,
      mirror: false,
      previewMirror: true,
      scale: 1.0,
      accessMessage: 'Please allow camera access when prompted by the browser.<br><br>' + 'Look for camera icon around your address bar.'
    };
    this.isReady = false;
    this.errorOccured = false;
    this.statsCaptureScale = 0.2;
    this.snapshots = {};
    this.displayedSnapshot = null;
    this.overlay = null;
    this.viewWidth = null;
    this.viewHeight = null;

    var container = theContainer;
    if (typeof container === 'string') {
      container = document.getElementById(container.replace('#', ''));
    }

    if (!container || !container.offsetWidth) {
      throw new Error('JpegCamera: invalid container');
    }

    container.innerHTML = '';
    this.viewWidth = parseInt(container.offsetWidth, 10);
    this.viewHeight = parseInt(container.offsetHeight, 10);

    this.container = document.createElement('div');
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.style.position = 'relative';

    container.appendChild(this.container);

    this.options = Object.assign({}, this.defaultOptions, options);
  }

  _createClass(JpegCameraBase, [{
    key: 'resize',
    value: function resize(containerWidth, containerHeight) {
      this.viewWidth = parseInt(containerWidth, 10);
      this.viewHeight = parseInt(containerHeight, 10);
      this.resizePreview();
      return this;
    }

    // Bind callback for camera ready event.
    //
    // Replaces the callback set using __onReady__ option during initialization.
    //
    // If the event has already happened the argument will be called immediately.
    //
    // @param callback [Function] function to call when camera is ready. Camera
    //   object will be available as `this`. This function will receive object with
    //   `videoWidth` and `videoHeight` properties as the first argument. These
    //   indicate camera's native resolution.
    //
    // @return [JpegCameraBase] Self for chaining.

  }, {
    key: 'ready',
    value: function ready(callback) {
      this.options.onReady = callback;
      if (this.options.onReady && this.isReady) {
        this.options.onReady.call(this, {
          videoWidth: this.videoWidth,
          videoHeight: this.videoHeight
        });
      }
      return this;
    }

    // Peak into video stream and calculate pixel statistics.
    //
    // Can be useful to give the user hints about bad lighting. It uses full
    // capture area, but at much lower resolution. It's more efficient than taking
    // a regular capture and calling {Snapshot#getStats}.
    //
    // Because reading image data can take a while when Flash fallback is being
    // used this method does not return the data immediately. Instead it accepts
    // a callback that later will be called with a {Stats} instance as an argument.
    // The camera object will be available as `this`.
    //
    // @param callback [Function] Function to call when data is available. Camera
    //   object will be available as `this`, the {Stats} instance will be passed
    //   as the first argument.
    //
    // @return [void]

  }, {
    key: 'getStats',
    value: function getStats(callback) {
      var snapshot = new _snapshot2.default(this, {});

      this.engineCapture(snapshot, false, 0.1, this.statsCaptureScale);

      var that = this;
      return snapshot.getStats(function (stats) {
        return callback.call(that, stats);
      });
    }

    // Capture camera snapshot.
    //
    // All of the options can have their defaults set when constructing camera
    // object.
    //
    // @option options quality [Float] Quality of the JPEG file that will be
    //   uploaded to the server. Should be between 0 and 1. Defaults to 0.9 or
    //   whatever was set during camera initialization. _Cannot_ be
    //   overwritten at the time of upload.
    // @option options mirror [Boolean] The video stream and images displayed on
    //   the client side mimic a mirror, because that's how people are used to
    //   seeing themselves. By default images are uploaded to the server in their
    //   natural orientation - how the front facing camera sees the user.
    //   This option can be set to true to upload images the way the user sees
    //   them. _Cannot_ be overwritten at the time of upload.
    // @option options scale [Float] By default snapshots are captured and uploaded
    //   using highest possible resolution. Set this to a number less than 1.0 to
    //   get smaller snapshots.
    // @option options shutter [Boolean] Whether to play the shutter sound.
    //
    // @return [Snapshot] The snapshot that was taken.

  }, {
    key: 'capture',
    value: function capture(newOptions) {
      var options = Object.assign({}, this.options);
      if (newOptions) {
        options = Object.assign({}, options, newOptions);
      }
      var snapshot = new _snapshot2.default(this, options);
      this.snapshots[snapshot.id] = snapshot;

      if (options.shutter) {
        this.enginePlayShutterSound();
      }

      var scale = Math.min(1.0, options.scale);
      scale = Math.max(0.01, scale);

      this.engineCapture(snapshot, options.mirror, options.quality, scale);

      return snapshot;
    }

    // Hide currently displayed snapshot and show the video stream.
    //
    // @return [JpegCameraBase] Self for chaining.

  }, {
    key: 'showStream',
    value: function showStream() {
      this.engineShowStream();
      this.displayedSnapshot = null;
      return this;
    }

    // Discard all snapshots and show video stream.
    //
    // @return [JpegCameraBase] Self for chaining.

  }, {
    key: 'discardAll',
    value: function discardAll() {
      var _this = this;

      if (this.displayedSnapshot) {
        this.showStream();
      }
      Object.keys(this.spanshots).map(function (id) {
        var snapshot = _this.snapshots[id];
        _this.engineDiscard(snapshot);
        snapshot.discarded = true;
        return null;
      });
      this.snapshots = {};
      return this;
    }

    // Log debug messages
    //
    // @nodoc
    // @private

  }, {
    key: 'debug',
    value: function debug(message) {
      if (this.options.onDebug) {
        return this.options.onDebug.call(this, message);
      }
      return null;
    }

    // @nodoc
    // @private

  }, {
    key: 'display',
    value: function display(snapshot) {
      this.engineDisplay(snapshot);
      this.displayedSnapshot = snapshot;
      return this.displayedSnapshot;
    }

    // @nodoc
    // @private

  }, {
    key: 'discard',
    value: function discard(snapshot) {
      if (this.displayedSnapshot === snapshot) {
        this.showStream();
      }
      this.engineDiscard(snapshot);
      // eslint-disable-next-line no-param-reassign
      snapshot.discarded = true;
      return delete this.snapshots[snapshot.id];
    }

    // Called by the engine when camera is ready.
    //
    // @nodoc
    // @private

  }, {
    key: 'prepared',
    value: function prepared(videoWidth, videoHeight) {
      this.videoWidth = videoWidth;
      this.videoHeight = videoHeight;

      // XXX Since this method is called from inside the Flash object, we need to
      // return control to make flash object usable again.
      var that = this;
      return setTimeout(function () {
        return that.waitUntilStreamLooksOk(true);
      }, 1);
    }

    // This peaks into the video stream using very small rendering and calculates
    // colors mean value and standard deviation. If standard deviation is
    // negligible then we assume camera isn't ready yet and wait a little longer.
    //
    // @nodoc
    // @private

  }, {
    key: 'waitUntilStreamLooksOk',
    value: function waitUntilStreamLooksOk(showDebug) {
      var _this2 = this;

      return this.getStats(function (stats) {
        if (stats.std > 2) {
          _this2.debug('Stream mean gray value = ' + stats.mean + ' standard deviation = ' + stats.std);
          _this2.debug('Camera is ready');

          _this2.isReady = true;
          if (_this2.options.onReady) {
            return _this2.options.onReady.call(_this2, {
              videoWidth: _this2.videoWidth,
              videoHeight: _this2.videoHeight
            });
          }
        } else {
          if (showDebug) {
            _this2.debug('Stream mean gray value = ' + stats.mean + ' standard deviation = ' + stats.std);
          }
          var that = _this2;
          return setTimeout(function () {
            return that.waitUntilStreamLooksOk(false);
          }, 100);
        }

        return null;
      });
    }

    // Shows an overlay over the container to block mouse access.
    //
    // Prevents changing flash permission after camera has been enabled or stopping
    // the HTML5 video stream - both options available through context menu of
    // Flash object or <video> elements.
    //
    // @nodoc
    // @private

  }, {
    key: 'blockElementAccess',
    value: function blockElementAccess() {
      this.overlay = document.createElement('div');
      this.overlay.style.width = '100%';
      this.overlay.style.height = '100%';
      this.overlay.style.position = 'absolute';
      this.overlay.style.top = 0;
      this.overlay.style.left = 0;
      this.overlay.style.zIndex = 2;

      return this.container.appendChild(this.overlay);
    }
  }]);

  return JpegCameraBase;
}();

exports.default = JpegCameraBase;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
// Contains possible error states of the component.
// This object is thrown from component in case of problems.
//
var WebcamError = exports.WebcamError = function WebcamError(errorCode) {
  var details = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  _classCallCheck(this, WebcamError);

  this.error = errorCode;
  this.details = details;
};

var WebcamErrors = exports.WebcamErrors = {
  INCORRECT_INITIALISATION: 'INCORRECT_INITIALISATION',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  GET_MEDIA_FAILED_INIT: 'GET_MEDIA_FAILED_INIT',
  FLASH_FAILED_LOADING: 'FLASH_FAILED_LOADING',
  FLASH_WINDOW_TOO_SMALL: 'FLASH_WINDOW_TOO_SMALL',
  CAMERA_NOT_READY: 'CAMERA_NOT_READY',
  GENERIC_ERROR: 'GENERIC_ERROR',
  NO_GET_MEDIA_NOR_FLASH_AVAILABLE: 'NO_GET_MEDIA_NOR_FLASH_AVAILABLE'
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jpeg_camera_html = __webpack_require__(4);

var _jpeg_camera_html2 = _interopRequireDefault(_jpeg_camera_html);

var _jpeg_camera_flash = __webpack_require__(7);

var _jpeg_camera_flash2 = _interopRequireDefault(_jpeg_camera_flash);

var _errors = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!navigator.getUserMedia) {
  navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
}
if (!window.AudioContext) {
  window.AudioContext = window.webkitAudioContext;
}

/**
 * @option options dontCheckFlash [Boolean] - if this option is set the engine will
 *   try the HTML5 version first and if this fails it will render the flash object
 *   without trying to determine if flash is installed and what version is it.
 *   This is required for Safari 10 which hides the fact of Flash being installed (but disabled
 *   by default). Rendering the Flash object will trigger confirmation dialog "Would you like
 *   to use Flash". WARNING - forcing render in such way means that the onError will never get
 *   executed in case the client disallow Flash to run.
 */

var JpegCamera = function JpegCamera(container, options) {
  var html5Init = function html5Init() {
    return new _jpeg_camera_html2.default(container, options);
  };
  var flashInit = function flashInit() {
    return new _jpeg_camera_flash2.default(container, options);
  };
  var initError = function initError() {
    throw new _errors.WebcamError(_errors.WebcamErrors.NO_GET_MEDIA_NOR_FLASH_AVAILABLE);
  };

  if (!options.onInit) {
    throw new _errors.WebcamError(_errors.WebcamErrors.INCORRECT_INITIALISATION);
  }

  _jpeg_camera_html2.default.engineCheck(
  /* success */function () {
    options.onInit(html5Init());
  },
  /* failure */function () {
    _jpeg_camera_flash2.default.engineCheck(
    /* success */function () {
      options.onInit(flashInit());
    },
    /* failure */function () {
      if (options.onError) options.onError(initError());
    });
  });
};

exports.default = JpegCamera;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _autoBind = __webpack_require__(0);

var _autoBind2 = _interopRequireDefault(_autoBind);

var _jpeg_camera = __webpack_require__(1);

var _jpeg_camera2 = _interopRequireDefault(_jpeg_camera);

var _errors = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var canPlay = function canPlay(type) {
  var elem = document.createElement('video');
  return !!(elem.canPlayType && elem.canPlayType(type).replace(/no/, ''));
};

// JpegCamera implementation that uses _getUserMedia_ to capture snapshots,
// _canvas_element_ to display them and optionally _Web_Audio_API_ to play shutter sound.
//
// @private

var JpegCameraHtml5 = function (_JpegCameraBase) {
  _inherits(JpegCameraHtml5, _JpegCameraBase);

  function JpegCameraHtml5(theContainer, options) {
    _classCallCheck(this, JpegCameraHtml5);

    var _this = _possibleConstructorReturn(this, (JpegCameraHtml5.__proto__ || Object.getPrototypeOf(JpegCameraHtml5)).call(this, theContainer, options));

    _this.waitForVideoReadyTimer = null;

    _this.statusChecksCount = 0;
    _this.vorbisAudio = 'audio/ogg; codecs=vorbis';
    _this.mpegAudio = 'audio/mpeg; ';
    _this.message = null;
    _this.videoContainer = null;
    _this.stream = null;
    (0, _autoBind2.default)(_this);
    _this.engineInit();
    return _this;
  }

  _createClass(JpegCameraHtml5, [{
    key: 'destruct',
    value: function destruct() {
      this.waitForVideoReadyTimer = null;
      if (this.video) {
        this.video.pause();
        this.video.src = '';
      }
      if (this.stream) {
        this.stream.getVideoTracks().forEach(function (track) {
          track.stop();
        });
        this.stream.getAudioTracks().forEach(function (track) {
          track.stop();
        });
      }
    }
  }, {
    key: 'engineInit',
    value: function engineInit() {
      var _this2 = this;

      this.debug('Using HTML5 engine.');

      this.message = document.createElement('div');
      this.message.class = 'message';
      this.message.style.width = '100%';
      this.message.style.height = '100%';
      (0, _jpeg_camera.addPrefixedStyle)(this.message, 'boxSizing', 'border-box');
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
      if (this.options.previewMirror) (0, _jpeg_camera.addPrefixedStyle)(this.video, 'transform', 'scalex(-1.0)');

      if (window.AudioContext) {
        if (canPlay(this.vorbisAudio)) {
          this.loadShutterSound(this.options.shutterOggUrl);
        } else if (canPlay(this.mpegAudio)) {
          this.loadShutterSound(this.options.shutterMp3Url);
        }
      }

      var success = function success(stream) {
        _this2.removeMessage();
        _this2.stream = stream;

        if (window.URL) {
          try {
            _this2.video.srcObject = stream;
          } catch (error) {
            _this2.video.src = URL.createObjectURL(stream);
          }
        } else {
          _this2.video.src = stream;
        }

        _this2.blockElementAccess();

        return _this2.waitForVideoReady();
      };

      navigator.mediaDevices.getUserMedia({
        video: {
          width: {
            min: 640,
            ideal: this.options.resolution
          },
          deviceId: { exact: this.options.deviceId }
        },
        audio: false
      }).then(function (stream) {
        if (!_this2.stream) {
          var tracks = stream.getVideoTracks();
          var settings = tracks[0].getSettings();
          _this2.debug('Camera resolution ' + settings.width + 'x' + settings.height + 'px');
          success(stream);
        }
      }).catch(function (error) {
        _this2.message.innerHTML = '';
        throw new _errors.WebcamError(_errors.WebcamErrors.GET_MEDIA_FAILED_INIT, error);
      });
    }
  }, {
    key: 'resizePreview',
    value: function resizePreview() {
      this.resizeVideoContainer();
      this.resizeVideoBox();
    }
  }, {
    key: 'resizeVideoContainer',
    value: function resizeVideoContainer() {
      var verticalPadding = Math.floor(this.viewHeight * 0.2);
      var horizontalPadding = Math.floor(this.viewWidth * 0.2);
      this.message.style.paddingTop = verticalPadding + 'px';
      this.message.style.paddingBottom = verticalPadding + 'px';
      this.message.style.paddingLeft = horizontalPadding + 'px';
      this.message.style.paddingRight = horizontalPadding + 'px';
      this.videoContainer.style.width = this.viewWidth + 'px';
      this.videoContainer.style.height = this.viewHeight + 'px';
    }
  }, {
    key: 'enginePlayShutterSound',
    value: function enginePlayShutterSound() {
      if (!this.shutterBuffer) {
        return null;
      }

      var source = this.audioContext.createBufferSource();
      source.buffer = this.shutterBuffer;
      source.connect(this.audioContext.destination);
      return source.start(0);
    }
  }, {
    key: 'engineCapture',
    value: function engineCapture(theSnapshot, mirror, quality, scale) {
      var snapshot = theSnapshot;
      var crop = this.getCaptureCrop();

      var canvas = document.createElement('canvas');
      canvas.width = Math.round(crop.width * scale);
      canvas.height = Math.round(crop.height * scale);

      var context = canvas.getContext('2d');
      context.drawImage(this.video, crop.xOffset, crop.yOffset, crop.width, crop.height, 0, 0, Math.round(crop.width * scale), Math.round(crop.height * scale));

      snapshot.canvas = canvas;
      snapshot.mirror = mirror;
      snapshot.quality = quality;

      return snapshot;
    }
  }, {
    key: 'engineDisplay',
    value: function engineDisplay(snapshot) {
      if (this.displayedcanvas) {
        this.container.removeChild(this.displayedcanvas);
      }

      this.displayedcanvas = snapshot.canvas;
      this.displayedcanvas.style.width = this.viewWidth + 'px';
      this.displayedcanvas.style.height = this.viewHeight + 'px';
      this.displayedcanvas.style.top = 0;
      this.displayedcanvas.style.left = 0;
      this.displayedcanvas.style.position = 'absolute';
      this.displayedcanvas.style.zIndex = 2;
      if (this.options.previewMirror) (0, _jpeg_camera.addPrefixedStyle)(this.displayedcanvas, 'transform', 'scalex(-1.0)');

      return this.container.appendChild(this.displayedcanvas);
    }
  }, {
    key: 'engineGetCanvas',
    value: function engineGetCanvas(snapshot) {
      var canvas = document.createElement('canvas');
      canvas.width = snapshot.canvas.width;
      canvas.height = snapshot.canvas.height;
      var context = canvas.getContext('2d');
      context.drawImage(snapshot.canvas, 0, 0);
      return canvas;
    }
  }, {
    key: 'engineGetImageData',
    value: function engineGetImageData(snapshot) {
      var canvas = snapshot.canvas;
      var context = canvas.getContext('2d');
      return context.getImageData(0, 0, canvas.width, canvas.height);
    }
  }, {
    key: 'engineGetBlob',
    value: function engineGetBlob(snapshot, mime, mirror, quality, callback) {
      var canvas = void 0;
      if (mirror) {
        canvas = document.createElement('canvas');
        canvas.width = snapshot.canvas.width;
        canvas.height = snapshot.canvas.height;

        var context = canvas.getContext('2d');
        context.setTransform(1, 0, 0, 1, 0, 0); // reset transformation matrix
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(snapshot.canvas, 0, 0);
      } else {
        canvas = snapshot.canvas;
      }

      return canvas.toBlob(function (blob) {
        return callback(blob);
      }, mime, quality);
    }
  }, {
    key: 'engineDiscard',
    value: function engineDiscard(snapshot) {
      // eslint-disable-next-line no-param-reassign
      return delete snapshot.canvas;
    }
  }, {
    key: 'engineShowStream',
    value: function engineShowStream() {
      if (this.displayedcanvas) {
        this.container.removeChild(this.displayedcanvas);
        this.displayedcanvas = null;
      }
      this.videoContainer.style.display = 'block';
      return null;
    }
  }, {
    key: 'removeMessage',
    value: function removeMessage() {
      this.message.style.display = 'none';
      return null;
    }
  }, {
    key: 'loadShutterSound',
    value: function loadShutterSound(url) {
      if (this.audioContext || !url) {
        return null;
      }

      this.audioContext = new AudioContext();

      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';

      var that = this;
      request.onload = function () {
        return that.audioContext.decodeAudioData(request.response, function (buffer) {
          that.shutterBuffer = buffer;
        });
      };
      return request.send();
    }
  }, {
    key: 'waitForVideoReady',
    value: function waitForVideoReady() {
      var videoWidth = parseInt(this.video.videoWidth, 10);
      var videoHeight = parseInt(this.video.videoHeight, 10);

      if (videoWidth > 0 && videoHeight > 0) {
        this.videoContainer.appendChild(this.video);

        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;

        this.video.style.position = 'relative';
        this.resizeVideoBox();

        return this.prepared(this.videoWidth, this.videoHeight);
      } else if (this.statusChecksCount > 100) {
        throw new _errors.WebcamError(_errors.WebcamError.CAMERA_NOT_READY);
      }
      this.statusChecksCount++;
      var that = this;
      this.waitForVideoReadyTimer = setTimeout(function () {
        return that.waitForVideoReady();
      }, 100);
      return null;
    }
  }, {
    key: 'resizeVideoBox',
    value: function resizeVideoBox() {
      var crop = this.getVideoCrop();
      this.video.style.width = crop.width + 'px';
      this.video.style.height = crop.height + 'px';
      this.video.style.left = crop.xOffset + 'px';
      this.video.style.top = crop.yOffset + 'px';
    }
  }, {
    key: 'getVideoCrop',
    value: function getVideoCrop() {
      var videoScale = void 0;
      var videoRatio = this.videoWidth / this.videoHeight;
      var viewRatio = this.viewWidth / this.viewHeight;

      if (videoRatio >= viewRatio) {
        // fill height, crop width
        this.debug('Filling height');
        videoScale = this.viewHeight / this.videoHeight;
        var scaledVideoWidth = Math.round(this.videoWidth * videoScale);

        return {
          width: scaledVideoWidth,
          height: this.viewHeight,
          xOffset: -Math.floor((scaledVideoWidth - this.viewWidth) / 2.0),
          yOffset: 0
        };
      }
      // fill width, crop height
      this.debug('Filling width');
      videoScale = this.viewWidth / this.videoWidth;
      var scaledVideoHeight = Math.round(this.videoHeight * videoScale);

      return {
        width: this.viewWidth,
        height: scaledVideoHeight,
        xOffset: 0,
        yOffset: -Math.floor((scaledVideoHeight - this.viewHeight) / 2.0)
      };
    }
  }, {
    key: 'getCaptureCrop',
    value: function getCaptureCrop() {
      var videoRatio = this.videoWidth / this.videoHeight;
      var viewRatio = this.viewWidth / this.viewHeight;

      if (videoRatio >= viewRatio) {
        // take full height, crop width
        var snapshotWidth = Math.round(this.videoHeight * viewRatio);

        return {
          width: snapshotWidth,
          height: this.videoHeight,
          xOffset: Math.floor((this.videoWidth - snapshotWidth) / 2.0),
          yOffset: 0
        };
      }
      // take full width, crop height
      var snapshotHeight = Math.round(this.videoWidth / viewRatio);

      return {
        width: this.videoWidth,
        height: snapshotHeight,
        xOffset: 0,
        yOffset: Math.floor((this.videoHeight - snapshotHeight) / 2.0)
      };
    }
  }]);

  return JpegCameraHtml5;
}(_jpeg_camera2.default);

JpegCameraHtml5.engineCheck = function (success, failure) {
  var canvas = document.createElement('canvas');
  if (canvas.getContext && !canvas.toBlob) {
    failure('JpegCamera: Canvas-to-Blob is not loaded');
  }
  try {
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      if (devices) {
        success();
      } else {
        failure();
      }
    }).catch(function () {
      failure();
    });
  } catch (err) {
    failure();
  }
};

exports.default = JpegCameraHtml5;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _autoBind = __webpack_require__(0);

var _autoBind2 = _interopRequireDefault(_autoBind);

var _stats = __webpack_require__(6);

var _stats2 = _interopRequireDefault(_stats);

var _jpeg_camera = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Snapshot taken using {JpegCamera}.
var Snapshot = function () {

  // @nodoc
  // @private


  // @nodoc
  // @private


  // @nodoc
  // @private


  // @nodoc
  // @private
  function Snapshot(camera, options) {
    _classCallCheck(this, Snapshot);

    this.nextSnapshotId = 1;
    this.discarded = false;
    this.extraCanvas = null;
    this.blob = null;
    this.blobMime = null;
    this.imageData = null;
    this.stats = null;
    this.getCanvasTimeout = null;
    this.getBlobTimeout = null;
    this.getImageDataTimeout = null;

    (0, _autoBind2.default)(this);
    this.camera = camera;
    this.options = options;
    this.id = this.nextSnapshotId++;
  }

  // Display the snapshot with the camera element it was taken with.
  //
  // @return [Snapshot] Self for chaining.


  // @nodoc
  // @private

  // @nodoc
  // @private


  // @nodoc
  // @private

  // Snapshot IDs are unique within browser session. This class variable holds
  // the value of the next ID to use.
  //
  // @nodoc
  // @private


  _createClass(Snapshot, [{
    key: 'show',
    value: function show() {
      if (this.discarded) {
        throw new Error('discarded snapshot cannot be used');
      }

      this.camera.display(this);
      return this;
    }

    // Stop displaying the snapshot and return to showing live camera stream.
    //
    // Ignored if camera is displaying different snapshot.
    //
    // @return [Snapshot] Self for chaining.

  }, {
    key: 'hide',
    value: function hide() {
      if (this.camera.displayedSnapshot() === this) {
        this.camera.showStream();
      }
      return this;
    }

    // Calculate snapshot pixel statistics (mean gray value, std).
    //
    // Because reading image data can take a while when Flash fallback is being
    // used this method does not return the data immediately. Instead it accepts
    // a callback that later will be called with a {Stats} object as an argument.
    // Snapshot will be available as `this`.
    //
    // @param callback [Function] Function to call when data is available. Snapshot
    //   object will be available as `this`, the {Stats} instance will be passed
    //   as the first argument.
    //
    // @return [void]

  }, {
    key: 'getStats',
    value: function getStats(callback) {
      var _this = this;

      if (this.discarded) {
        throw new Error('discarded snapshot cannot be used');
      }

      return this.getImageData(function (data) {
        return _this.calculateStats(data, callback);
      });
    }

    // Get canvas element showing the snapshot.
    //
    // This can be used to display the snapshot outside the camera's container.
    // You can show multiple snapshots at a time and allow the user to pick one
    // he likes best.
    //
    // Canvas produced by this method has a resolution of the snapshot (which
    // depends on the camera's native resolution), not that of the camera's
    // container. Use CSS to display this canvas in different sizes.
    //
    // Because reading image data can take a while when Flash fallback is being
    // used this method does not return the `canvas` element immediately. Instead
    // it accepts a callback that later will be called with the `canvas` element as
    // an argument. Snapshot will be available as `this`.
    //
    // Multiple calls to this method will yield the same canvas element.
    //
    // One caveat is that the underlaying data of this canvas is not mirrored like
    // the stream shown in the camera container. Special CSS transform directive
    // is applied on it so that it looks like the picture in the camera when
    // displayed. This only matters when manipulating the canvas or reading it's
    // data. You can read more about mirroring in {JpegCamera#capture}.
    //
    // This method doesn't work in Internet Explorer 8 or earlier, because it does
    // not support `canvas` element. Call {isCanvasSupported} to learn
    // whether you can use this method.
    //
    // @param callback [Function] Function to call when `canvas` element is
    //   available. Snapshot object will be available as `this`, the `canvas`
    //   element will be passed as the first argument.
    //
    // @return [Boolean] Whether canvas is supported in this browser.

  }, {
    key: 'getCanvas',
    value: function getCanvas(callback) {
      if (this.discarded) {
        throw new Error('discarded snapshot cannot be used');
      }

      if (!(0, _jpeg_camera.isCanvasSupported)()) {
        return false;
      }

      var that = this;
      this.getCanvasTimeout = setTimeout(function () {
        if (!that.extraCanvas) {
          that.extraCanvas = that.camera.engineGetCanvas(that);
        }
        (0, _jpeg_camera.addPrefixedStyle)(that.extraCanvas, 'transform', 'scalex(-1.0)');
        return callback.call(that, that.extraCanvas);
      }, 1);
      return true;
    }

    // Get the file that would be uploaded to the server as a Blob object.
    //
    // This can be useful if you want to stream the data via a websocket. Note that
    // using `upload` is more efficient if all you want to do is upload this file
    // to a server via POST call.
    //
    // This method doesn't work in Internet Explorer 8 or earlier, because it does
    // not support `canvas` element. Call {isCanvasSupported} to learn
    // whether you can use this method.
    //
    // Because preparing image blob can take a while this method does not return
    // the data immediately. Instead it accepts a callback that later will be
    // called with the data object as an argument. Snapshot will be available as
    // `this`.
    //
    // Multiple calls to this method will yield the same data object.
    //
    // @param callback [Function] Function to call when data is available. Snapshot
    //   object will be available as `this`, the blob object will be passed as the
    //   first argument.
    // @param mimeType [String] Mime type of the requested blob. "image/jpeg" by
    //   default.
    //
    // @return [Boolean] Whether canvas is supported in this browser.

  }, {
    key: 'getBlob',
    value: function getBlob(callback, mimeType) {
      var theMimeType = mimeType;
      if (theMimeType == null) {
        theMimeType = 'image/jpeg';
      }
      if (this.discarded) {
        throw new Error('discarded snapshot cannot be used');
      }

      if (!(0, _jpeg_camera.isCanvasSupported)()) {
        return false;
      }

      var that = this;
      this.getBlobTimeout = setTimeout(function () {
        if (that.blobMime !== theMimeType) {
          that.blob = null;
        }
        that.blobMime = theMimeType;
        if (that.blob) {
          return callback.call(that, that.blob);
        }
        var mirror = that.options.mirror;
        var quality = that.options.quality;

        return that.camera.engineGetBlob(that, theMimeType, mirror, quality, function (b) {
          that.blob = b;
          return callback.call(that, that.blob);
        });
      }, 1);
      return true;
    }

    // Get ImageData object containing color values for each pixel of the snapshot.
    //
    // Data produced by this method has a resolution of the snapshot (which depends
    // on the camera's native resolution), not that of the camera's container.
    //
    // Read more about ImageData object on [Mozilla's website
    // ](https://developer.mozilla.org/en-US/docs/Web/API/ImageData).
    //
    // Because reading image data can take a while when Flash fallback is being
    // used this method does not return the data immediately. Instead it accepts
    // a callback that later will be called with the data object as an argument.
    // Snapshot will be available as `this`.
    //
    // Multiple calls to this method will yield the same data object.
    //
    // One caveat is that the returned data is not mirrored like the stream shown
    // in the camera container. This only matters when manipulating the canvas or
    // reading it's data. You can read more about mirroring in
    // {JpegCamera#capture}.
    //
    // This method returns native [ImageData
    // ](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object in all
    // browsers except Internet Explorer 8 or earlier which does not support
    // the `canvas` element. In that browser a generic JavaScript object will be
    // returned that mimics the native format. Call {isCanvasSupported}
    // to learn whether `canvas` is supported by the browser.
    //
    // @param callback [Function] Function to call when data is available. Snapshot
    //   object will be available as `this`, the data will be passed as the
    //   first argument.
    //
    // @return [void]

  }, {
    key: 'getImageData',
    value: function getImageData(callback) {
      if (this.discarded) {
        throw new Error('discarded snapshot cannot be used');
      }

      var that = this;
      this.getImageDataTimeout = setTimeout(function () {
        if (!that.imageData) {
          that.imageData = that.camera.engineGetImageData(that);
        }
        return callback.call(that, that.imageData);
      }, 1);

      return null;
    }

    // Hide and discard this snapshot.
    //
    // After discarding a snapshot an attempt to show or upload it will raise
    // an error.
    //
    // @return [void]

  }, {
    key: 'discard',
    value: function discard() {
      this.camera.discard(this);
      delete this.extraCanvas;
      delete this.imageData;
      delete this.blob;
    }

    // Snapshot options
    //
    // @nodoc
    // @private

  }, {
    key: 'options',
    value: function options() {
      return Object.assign({}, this.camera.options, this.options, this.uploadOptions);
    }

    // Calculate the snapshot pixel statistics given image data and call callback.
    //
    // @nodoc
    // @private

  }, {
    key: 'calculateStats',
    value: function calculateStats(data, callback) {
      if (!this.stats) {
        var gray = void 0;
        var n = data.width * data.height;
        var sum = 0.0;
        var grayValues = new Array(n);

        for (var i = 0, end = n; i < end; i++) {
          var index = i * 4;
          gray = 0.2126 * data.data[index + 0] + // red
          0.7152 * data.data[index + 1] + // green
          0.0722 * data.data[index + 2]; // blue
          gray = Math.round(gray);

          sum += gray;
          grayValues[i] = gray;
        }

        var mean = Math.round(sum / n);

        var sumOfSquareDistances = 0;
        grayValues.forEach(function (oneGray) {
          // eslint-disable-next-line no-restricted-properties
          sumOfSquareDistances += Math.pow(oneGray - mean, 2);
        });

        this.stats = new _stats2.default();
        this.stats.mean = mean;
        this.stats.std = Math.round(Math.sqrt(sumOfSquareDistances / n));
      }
      return callback.call(this, this.stats);
    }
  }]);

  return Snapshot;
}();

exports.default = Snapshot;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
// Contains some pixel statistics of {Snapshot} or camera stream.
//
// Can be retrieved using {JpegCamera#getStats} or {Snapshot#getStats} methods.
//
var Stats = function Stats() {
  _classCallCheck(this, Stats);

  this.mean = null;
  this.std = null;
}
// @property [Float] mean gray value of pixels (0-255)


// @property [Float] standard deviation of gray values
;

exports.default = Stats;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _autoBind = __webpack_require__(0);

var _autoBind2 = _interopRequireDefault(_autoBind);

var _jpeg_camera = __webpack_require__(1);

var _jpeg_camera2 = _interopRequireDefault(_jpeg_camera);

var _errors = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//
// JpegCamera implementation that uses Flash to capture and display snapshots.
//
// @private
var JpegCameraFlash = function (_JpegCameraBase) {
  _inherits(JpegCameraFlash, _JpegCameraBase);

  function JpegCameraFlash(theContainer, options) {
    _classCallCheck(this, JpegCameraFlash);

    var _this = _possibleConstructorReturn(this, (JpegCameraFlash.__proto__ || Object.getPrototypeOf(JpegCameraFlash)).call(this, theContainer, options));

    _this.waitForVideoReadyTimer = null;

    _this.instances = {};
    _this.nextId = 1;
    (0, _autoBind2.default)(_this);
    _this.engineInit();
    return _this;
  }

  _createClass(JpegCameraFlash, [{
    key: 'destruct',
    value: function destruct() {
      this.waitForVideoReadyTimer = null;
    }

    // Used by flash object to send message to our instance.

  }, {
    key: 'sendMessage',
    value: function sendMessage(id, method) {
      var _prototype$method;

      var instance = this.instances[parseInt(id, 10)];

      if (!instance) {
        return null;
      }

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return (_prototype$method = this.prototype[method]).apply.apply(_prototype$method, [instance].concat(args));
    }
  }, {
    key: 'engineInit',
    value: function engineInit() {
      var _this2 = this;

      this.debug('Using Flash engine');

      // register our instance
      this.id = this.nextId++;
      this.instances[this.id] = this;

      var flashObjectId = 'flash_object_' + this.id;

      var params = {
        loop: 'false',
        allowScriptAccess: 'always',
        allowFullScreen: 'false',
        quality: 'best',
        wmode: 'opaque',
        menu: 'false'
      };
      var attributes = {
        id: flashObjectId,
        align: 'middle'
      };
      var flashvars = {
        id: this.id,
        width: this.viewWidth,
        height: this.viewHeight,
        shutter_url: this.options.shutterMp3Url ? this.options.shutterMp3Url : ''
      };
      var that = this;
      var callback = function callback(event) {
        if (!event.success) {
          throw new _errors.WebcamError(_errors.WebcamErrors.FLASH_FAILED_LOADING, event);
        }
        that.debug('Flash loaded.');
        that.flash = document.getElementById(flashObjectId);
        if (_this2.options.onReady) {
          _this2.waitForVideoReady();
        }
        return null;
      };

      var containerToBeReplaced = document.createElement('div');
      containerToBeReplaced.id = 'jpeg_cameraflash_' + this.id;
      containerToBeReplaced.style.width = '100%';
      containerToBeReplaced.style.height = '100%';
      if (this.options.previewMirror) {
        (0, _jpeg_camera.addPrefixedStyle)(containerToBeReplaced, 'transform', 'scalex(-1.0)');
      }

      this.container.appendChild(containerToBeReplaced);

      // eslint-disable-next-line no-undef
      swfobject.embedSWF(this.options.swfUrl, containerToBeReplaced.id, this.viewWidth, this.viewHeight, '0', null, flashvars, params, attributes, callback);
    }
  }, {
    key: 'waitForVideoReady',
    value: function waitForVideoReady() {
      try {
        // eslint-disable-next-line no-underscore-dangle
        if (this.flash._capture(1, false, 0.1, 1)) {
          return this.options.onReady.call(this, null);
        }
      } catch (e) {}
      // do nothing

      /*
      */
      var that = this;
      this.waitForVideoReadyTimer = setTimeout(function () {
        return that.waitForVideoReady();
      }, 500);
      return null;
    }
  }, {
    key: 'resizePreview',
    value: function resizePreview() {
      if (this.viewWidth < 215 || this.viewHeight < 138) {
        throw new _errors.WebcamError(_errors.WebcamErrors.FLASH_WINDOW_TOO_SMALL);
      }
      this.flash.parentNode.removeChild(this.flash);
      this.flash = null;
      this.engineInit();
      return this;
    }
  }, {
    key: 'enginePlayShutterSound',
    value: function enginePlayShutterSound() {
      // eslint-disable-next-line no-underscore-dangle
      return this.flash._play_shutter();
    }
  }, {
    key: 'engineCapture',
    value: function engineCapture(snapshot, mirror, quality, scale) {
      // eslint-disable-next-line no-underscore-dangle
      return this.flash._capture(snapshot.id, mirror, quality, scale);
    }
  }, {
    key: 'engineDisplay',
    value: function engineDisplay(snapshot) {
      // eslint-disable-next-line no-underscore-dangle
      return this.flash._display(snapshot.id);
    }
  }, {
    key: 'engineGetCanvas',
    value: function engineGetCanvas(snapshot) {
      // eslint-disable-next-line no-param-reassign
      if (!snapshot.imageData) {
        snapshot.imageData = this.engineGetImageData(snapshot);
      }
      var canvas = document.createElement('canvas');
      canvas.width = snapshot.imageData.width;
      canvas.height = snapshot.imageData.height;
      var context = canvas.getContext('2d');
      context.putImageData(snapshot.imageData, 0, 0);
      return canvas;
    }
  }, {
    key: 'engineGetImageData',
    value: function engineGetImageData(snapshot) {
      var result = void 0;
      // eslint-disable-next-line no-underscore-dangle
      var flashData = this.flash._get_image_data(snapshot.id);

      if ((0, _jpeg_camera.isCanvasSupported)()) {
        var canvas = document.createElement('canvas');
        canvas.width = flashData.width;
        canvas.height = flashData.height;
        var context = canvas.getContext('2d');
        result = context.createImageData(flashData.width, flashData.height);
      } else {
        result = {
          data: [],
          width: flashData.width,
          height: flashData.height
        };
      }

      for (var i = 0; i < flashData.data.length; i++) {
        var pixel = flashData.data[i];
        var index = i * 4;

        /* eslint-disable no-bitwise */
        var red = pixel >> 16 & 0xff;
        var green = pixel >> 8 & 0xff;
        var blue = pixel & 0xff;

        result.data[index + 0] = red;
        result.data[index + 1] = green;
        result.data[index + 2] = blue;
        result.data[index + 3] = 255;
      }
      return result;
    }
  }, {
    key: 'engineGetBlob',
    value: function engineGetBlob(snapshot, mime, mirror, quality, callback) {
      var canvas = void 0;
      // eslint-disable-next-line no-param-reassign
      if (!snapshot.extraCanvas) {
        snapshot.extraCanvas = this.engineGetCanvas(snapshot);
      }

      if (mirror) {
        canvas = document.createElement('canvas');
        canvas.width = snapshot.canvas.width;
        canvas.height = snapshot.canvas.height;

        var context = canvas.getContext('2d');
        context.setTransform(1, 0, 0, 1, 0, 0); // reset transformation matrix
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(snapshot.extraCanvas, 0, 0);
      } else {
        canvas = snapshot.extraCanvas;
      }

      return canvas.toBlob(function (blob) {
        return callback(blob);
      }, mime, quality);
    }
  }, {
    key: 'engineDiscard',
    value: function engineDiscard(snapshot) {
      // eslint-disable-next-line no-underscore-dangle
      return this.flash._discard(snapshot.id);
    }
  }, {
    key: 'engineShowStream',
    value: function engineShowStream() {
      // eslint-disable-next-line no-underscore-dangle
      return this.flash._show_stream();
    }
  }, {
    key: 'flashPrepared',
    value: function flashPrepared(width, height) {
      this.blockElementAccess();

      // XXX steal focus from the flash object
      document.body.tabIndex = 0;
      document.body.focus();

      return this.prepared(width, height);
    }
  }]);

  return JpegCameraFlash;
}(_jpeg_camera2.default);

JpegCameraFlash.engineCheck = function (success, failure) {
  if (!window.swfobject) {
    failure('JpegCamera: SWFObject is not loaded.');
  }
  // TODO disabled until I figure out how to detect flash cross-browser way
  // if (!window.swfobject.hasFlashPlayerVersion('9')) {
  //   failure('No Flash in version 9 available.');
  // }
  success();
};

exports.default = JpegCameraFlash;

/***/ })
/******/ ]);
});