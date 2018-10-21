import './sass/wave.scss';

/**
 * Эффект пульсации кнопки
 *
 * @param event
 * @param arg_opts
 * @returns {boolean}
 */
export default function(event, arg_opts) {
    let opts = Object.assign({
            element: event.currentTarget, // Элемент по которому кликали
            type: 'hit', // Место растпространения волны
            bgc: 'rgba(0, 0, 0, 0.15)' // Цвет пульсации
        }, arg_opts),
        target = opts.element;

    if (target.classList.contains('wave-center')) {
        opts.type = 'center';
    }

    if(target) {
        let rect = target.getBoundingClientRect(),
            wave = target.querySelector('.e-wave');

        if (!wave) {
            wave = document.createElement('span');
            wave.className = 'e-wave';
            wave.style.height = wave.style.width = Math.max(rect.width, rect.height) + 'px';
            target.appendChild(wave);
        } else {
            wave.className = 'e-wave';
        }

        switch (opts.type) {
            case 'center':
                wave.style.top = (rect.height / 2 - wave.offsetHeight / 2 ) + 'px';
                wave.style.left = (rect.width / 2 - wave.offsetWidth / 2) + 'px';
                break;
            default:
                wave.style.top = ((event.pageY || event.targetTouches[0].pageY) - rect.top - wave.offsetHeight / 2 - document.body.scrollTop) + 'px';
                wave.style.left = ((event.pageX || event.targetTouches[0].pageX) - rect.left - wave.offsetWidth / 2 - document.body.scrollLeft) + 'px';
        }

        wave.style.backgroundColor = opts.bgc;
        wave.className = 'e-wave z-active';

        return false;
    }
}