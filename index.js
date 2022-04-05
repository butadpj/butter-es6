// ES6 version Butter of https://github.com/BCJdevelopment/butter.js

class Butter {
  constructor() {
    this.wrapperDamper;
    this.wrapperId;
    this.cancelOnTouch;
    this.wrapper;
    this.wrapperOffset = 0;
    this.animateId;
    this.resizing = false;
    this.active = false;
    this.wrapperHeight;
    this.bodyHeight;

    this.defaults = {
      wrapperId: 'butter',
      wrapperDamper: 0.07,
      cancelOnTouch: false,
    };
  }

  init(options = this.defaults) {
    if (options) {
      this.validateOptions(options);
    }

    this.active = true;
    this.resizing = false;
    this.wrapperDamper = this.defaults.wrapperDamper;
    this.wrapperId = this.defaults.wrapperId;
    this.cancelOnTouch = this.defaults.cancelOnTouch;

    this.wrapper = document.getElementById(this.wrapperId);
    this.wrapper.style.position = 'fixed';
    this.wrapper.style.width = '100%';

    this.wrapperHeight = this.wrapper.clientHeight;
    document.body.style.height = this.wrapperHeight + 'px';

    window.addEventListener('resize', () => this.resize());
    if (this.cancelOnTouch) {
      window.addEventListener('touchstart', () => this.cancel());
    }
    this.wrapperOffset = 0.0;
    this.animateId = window.requestAnimationFrame(() => this.animate());

    // window.addEventListener('load', this.resize.bind(this));
  }

  validateOptions(options) {
    for (const prop in options) {
      if (this.defaults.hasOwnProperty(prop)) {
        Object.defineProperty(this.defaults, prop, {
          value: Object.getOwnPropertyDescriptor(options, prop).value,
        });
      }
    }
  }

  wrapperUpdate() {
    const scrollY =
      document.scrollingElement != undefined
        ? document.scrollingElement.scrollTop
        : document.documentElement.scrollTop || 0.0;
    this.wrapperOffset += (scrollY - this.wrapperOffset) * this.wrapperDamper;

    if (this.wrapper)
      this.wrapper.style.transform =
        'translate3d(0,' + -this.wrapperOffset.toFixed(2) + 'px, 0)';
  }

  resize() {
    if (!this.resizing) {
      this.resizing = true;
      window.cancelAnimationFrame(this.animateId);
      window.setTimeout(() => {
        this.wrapperHeight = this.wrapper.clientHeight;
        if (
          parseInt(document.body.style.height) != parseInt(this.wrapperHeight)
        ) {
          document.body.style.height = this.wrapperHeight + 'px';
        }
        this.animateId = window.requestAnimationFrame(() => this.animate());
        this.resizing = false;
      }, 150);
    }
  }

  checkResize() {
    if (this.wrapperHeight != this.wrapper.clientHeight) {
      this.resize();
    }
  }

  animate() {
    this.checkResize();
    this.wrapperUpdate();
    this.animateId = window.requestAnimationFrame(() => this.animate());
  }

  cancel() {
    if (this.active) {
      window.cancelAnimationFrame(this.animateId);

      window.removeEventListener('resize', () => this.resize());
      window.removeEventListener('touchstart', () => this.cancel);
      this.wrapper.removeAttribute('style');
      document.body.removeAttribute('style');

      this.active = false;
      this.wrapper = '';
      this.wrapperOffset = 0;
      this.resizing = true;
      this.animateId = '';
    }
  }
}

export default new Butter();
