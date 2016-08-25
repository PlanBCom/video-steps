'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('babel-runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('babel-runtime/helpers/createClass'));

var VideoSteps = function () {
  function VideoSteps(selector, stepsOptions) {
    _classCallCheck(this, VideoSteps);

    this.video = selector;
    this.currentStep = 0;
    this.steps = stepsOptions;

    var videoInstance = this;
    this.video.onloadeddata = function () {
      // can play
      // inicializa os steps desejados
      videoInstance.ready();
    };

    this.setKeyShortcuts();
  }

  _createClass(VideoSteps, [{
    key: 'ready',
    value: function ready() {
      this.video.play();
      this.video.pause();
      this.video.currentTime = this.steps[this.currentStep].seekTime;
    }
  }, {
    key: 'next',
    value: function next() {
      var isValidStep = this.currentStep + 1 < this.steps.length;
      var isInTransition = document.querySelector('.video-step.fading') != null;

      if (isValidStep && !isInTransition) {
        var currentStepTransition = this.steps[this.currentStep];
        var oldElement = document.querySelector(currentStepTransition.elementId);

        oldElement.setAttribute('class', 'fading');

        this.currentStep = this.currentStep + 1;

        this.seekAnimatedTo(this.currentStep);
      }
    }
  }, {
    key: 'prev',
    value: function prev() {
      var isValidStep = this.currentStep - 1 >= 0;
      var isInTransition = document.querySelector('.video-step.fading') != null;

      if (isValidStep && !isInTransition) {
        this.currentStep = this.currentStep - 1;
        var currentStepTransition = this.steps[this.currentStep];

        document.querySelector('.video-step').classList.remove('active');
        document.querySelector(currentStepTransition.elementId).classList.add('active');

        this.video.currentTime = currentStepTransition.seekTime;
      }
    }
  }, {
    key: 'seekAnimatedTo',
    value: function seekAnimatedTo(step) {
      var currentStepTransition = this.steps[step];
      var transitionTime = currentStepTransition.seekTime - this.steps[step - 1].seekTime;
      var videoAnimate = this.video;

      videoAnimate.play();

      setTimeout(function () {
        videoAnimate.pause();
        videoAnimate.currentTime = currentStepTransition.seekTime;

        document.querySelector('.video-step').classList.remove('active', 'fading');
        document.querySelector(currentStepTransition.elementId).add('active');
      }, transitionTime * 1000);
    }
  }, {
    key: 'setKeyShortcuts',
    value: function setKeyShortcuts() {
      var videoInstance = this;
      document.keyup(function (e) {
        var wch = e.which;
        if (wch === 40 || wch === 39 || wch === 13 || wch === 32) {
          // down, right, enter, space
          e.preventDefault();
          videoInstance.next();
        } else if (wch === 38 || wch === 37) {
          // up, left
          e.preventDefault();
          videoInstance.prev();
        }
      });
    }

    // $(".videostep-next").on('click', function() {
    //   videoInstance.next();
    // });

    // $('html').on('mousewheel', function(event) {
    //   if (event.originalEvent.deltaY > 50) {
    //     videoInstance.next();
    //   } else if (event.originalEvent.deltaY < -50) {
    //     videoInstance.prev();
    //   }
    // });


    // hello() {
    //   return `Welcome, ${this.name}!`;
    // }

  }]);

  return VideoSteps;
}();

exports.VideoSteps = VideoSteps;
//# sourceMappingURL=index.js.map