'use strict';

import '../sass/wave.scss';

class Wave {

  constructor(event, opts) {
    this.defaultOpts = {
      element: event.currentTarget, // Элемент по которому кликали
      type: 'hit', // Место растпространения волны
      bgc: 'rgba(0, 0, 0, 0.15)' // Цвет пульсации
    };
    this.opts = Object.assign(this.defaultOpts, opts);
    this.event;

    this.checkColor();
    this.checkType();
  }

  init() {
    let target = this.opts.element;

    if(target) {
      let rect = target.getBoundingClientRect(),
        wave = target.querySelector('.e-wave'),
        top = 0,
        left = 0;

      if (!wave) {
        wave = document.createElement('span');
        wave.className = 'e-wave';
        wave.style.height = wave.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(wave);
      } else {
        wave.className = 'e-wave';
      }

      switch (this.opts.type) {
        case 'center':
          top = rect.height / 2;
          left = rect.width / 2;
          break;

        default:
          top = this.event.layerY;
          left = this.event.layerX;
      }

      wave.style.top = (top - wave.offsetHeight / 2 ) + 'px';
      wave.style.left = (left - wave.offsetWidth / 2) + 'px';
      wave.style.backgroundColor = this.opts.bgc;
      wave.className = 'e-wave z-active';
    }
  }

  checkType() {
    if (this.opts.element.classList.contains('wave-center')) {
      this.opts.type = 'center';
    }
  }

  checkColor() {
    switch (true) {
      case this.opts.element.classList.contains('wave-white'):
        this.opts.bgc = 'rgba(255, 255, 255, 0.3)';
        break;

      default:
        this.opts.bgc = this.defaultOpts.bgc;
    }
  }
}

/**
 * Эффект пульсации кнопки
 *
 * @param event
 * @param arg_opts
 * @returns {boolean}
 */
export default function(element, opts) {
  let elements = document.querySelectorAll(element);

  Array.prototype.forEach.call(elements, function(item) {
    item.addEventListener('click', function (event) {
      new Wave(event, opts).init();
    });
  });
}