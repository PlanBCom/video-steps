
class VideoSteps {

  constructor(selector, stepsOptions) {
    this.video = selector;
    this.currentStep = 0;
    this.steps = stepsOptions;

    const videoInstance = this;
    this.video.onloadeddata = function () { // can play
      // inicializa os steps desejados
      videoInstance.ready();
    };

    this.setKeyShortcuts();
  }

  ready() {
    this.video.play();
    this.video.pause();
    this.video.currentTime = this.steps[this.currentStep].seekTime;
  }

  next() {
    const isValidStep = this.currentStep + 1 < this.steps.length;
    const isInTransition = document.querySelector('.video-step.fading') != null;

    if (isValidStep && !isInTransition) {
      const currentStepTransition = this.steps[this.currentStep];
      const oldElement = document.querySelector(currentStepTransition.elementId);

      oldElement.setAttribute('class', 'fading');

      this.currentStep = this.currentStep + 1;

      this.seekAnimatedTo(this.currentStep);
    }
  }

  prev() {
    const isValidStep = this.currentStep - 1 >= 0;
    const isInTransition = document.querySelector('.video-step.fading') != null;

    if (isValidStep && !isInTransition) {
      this.currentStep = this.currentStep - 1;
      const currentStepTransition = this.steps[this.currentStep];

      document.querySelector('.video-step').classList.remove('active');
      document.querySelector(currentStepTransition.elementId).classList.add('active');

      this.video.currentTime = currentStepTransition.seekTime;
    }
  }

  seekAnimatedTo(step) {
    const currentStepTransition = this.steps[step];
    const transitionTime = currentStepTransition.seekTime - this.steps[step - 1].seekTime;
    const videoAnimate = this.video;

    videoAnimate.play();

    setTimeout(() => {
      videoAnimate.pause();
      videoAnimate.currentTime = currentStepTransition.seekTime;

      document.querySelector('.video-step').classList.remove('active', 'fading');
      document.querySelector(currentStepTransition.elementId).add('active');
    }, transitionTime * 1000);
  }

  setKeyShortcuts() {
    const videoInstance = this;
    document.keyup(e => {
      const wch = e.which;
      if (wch === 40 || wch === 39 || wch === 13 || wch === 32) { // down, right, enter, space
        e.preventDefault();
        videoInstance.next();
      } else if (wch === 38 || wch === 37) { // up, left
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

}

export default VideoSteps;
