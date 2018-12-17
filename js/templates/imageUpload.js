import AbstractView from '../AbstractView';
import {
  EFFECTS,
  STYLE_EFFECT,
  ESC_KEY_CODE,
  DEFAULT_EFFECT_VALUE,
  DEFAULT_CURRENT_EFFECT,
  DEFAULT_SIZE,
  MAX_SIZE,
  MIN_SIZE,
  SIZE_STEP,
} from '../constants';
import { getEffectValue, validateHashtags } from '../utils';

class ImageUpload extends AbstractView {
  constructor() {
    super();
    this.sizeValue = DEFAULT_SIZE;
    this.currentEffect = DEFAULT_CURRENT_EFFECT;
    this.effectvalue = DEFAULT_EFFECT_VALUE;
  }

  get template() {
    return `
        <div class="img-upload__overlay">
          <div class="img-upload__wrapper">
            <div class="img-upload__preview-container">
              <!-- Изменение размера изображения -->
              <fieldset class="img-upload__scale  scale">
                <button
                  type="button"
                  class="scale__control  scale__control--smaller"
                >
                  Уменьшить
                </button>
                <input
                  type="text"
                  class="scale__control  scale__control--value"
                  value=${this.sizeValue}
                  title="Image Scale"
                  name="scale"
                  readonly
                />
                <button
                  type="button"
                  class="scale__control  scale__control--bigger"
                >
                  Увеличить
                </button>
              </fieldset>

              <!-- Предварительный просмотр изображения -->
              <div class="img-upload__preview effects__preview--${
                this.currentEffect
              }">
                <img
                  src="img/upload-default-image.jpg"
                  alt="Предварительный просмотр фотографии"
                />
              </div>

              <!--
                Изменение глубины эффекта, накладываемого на изображение
              -->
              <fieldset class="img-upload__effect-level  effect-level">
                <input
                  class="effect-level__value"
                  type="number"
                  name="effect-level"
                  value=${this.effectvalue}
                />
                <div class="effect-level__line">
                  <div class="effect-level__pin" tabindex="0">
                    Кнопка изменения глубины эффекта фотографии
                  </div>
                  <div class="effect-level__depth">
                    Глубина эффекта фотографии
                  </div>
                </div>
              </fieldset>

              <!--
                Кнопка для закрытия формы редактирования изображения
              -->
              <button
                type="reset"
                class="img-upload__cancel  cancel"
                id="upload-cancel"
              >
                Закрыть
              </button>
            </div>

            <!-- Наложение эффекта на изображение -->
            <fieldset class="img-upload__effects  effects">
              <ul class="effects__list">
              ${EFFECTS.map(
                effect => `<li class="effects__item">
                <input
                  type="radio"
                  class="effects__radio  visually-hidden"
                  name="effect"
                  id="effect-${effect.name}"
                  value="${effect.name}"
                />
                <label for="effect-${effect.name}" class="effects__label">
                  <span
                    class="effects__preview  effects__preview--${effect.name}"
                    >Превью эффекта ${effect.label}</span
                  >
                  ${effect.label}
                </label>
              </li>`,
              ).join('')}
              </ul>
            </fieldset>

            <!-- Добавление хэш-тегов и комментария к изображению -->
            <fieldset class="img-upload__text text">
              <input
                class="text__hashtags"
                name="hashtags"
                placeholder="#хэш-тег"
              />
              <textarea
                class="text__description"
                name="description"
                placeholder="Ваш комментарий..."
              ></textarea>
            </fieldset>

            <!-- Кнопка для отправки данных на сервер -->
            <button
              type="submit"
              class="img-upload__submit"
              id="upload-submit"
            >
              Опубликовать
            </button>
          </div>
        </div>`;
  }

  bind(element) {
    const effectButtons = element.querySelectorAll('.effects__item');
    const pin = element.querySelector('.effect-level__pin');
    const valueInput = element.querySelector('.effect-level__value');
    const activeScale = element.querySelector('.effect-level__depth');
    const image = element.querySelector('.img-upload__preview');
    const scale = element.querySelector('.effect-level__line');
    const scaleElement = element.querySelector('.img-upload__effect-level');
    const hashtagInput = element.querySelector('.text__hashtags');
    const minusButton = element.querySelector('.scale__control--smaller');
    const plusButton = element.querySelector('.scale__control--bigger');
    const sizeInput = element.querySelector('.scale__control--value');
    const commentInput = element.querySelector('.text__description');
    const closeButton = element.querySelector('.img-upload__cancel');

    minusButton.addEventListener('click', () => {
      if (sizeInput.value > MIN_SIZE) {
        sizeInput.value -= SIZE_STEP;
        image.style.transform = `scale(0.${sizeInput.value})`;
      }
    });
    plusButton.addEventListener('click', () => {
      if (sizeInput.value < MAX_SIZE) {
        sizeInput.value = +sizeInput.value + SIZE_STEP;
        image.style.transform = `scale(${sizeInput.value / 100})`;
      }
    });

    const setValue = (
      effectvalue = DEFAULT_EFFECT_VALUE,
      currentEffect = DEFAULT_CURRENT_EFFECT,
    ) => {
      valueInput.value = Math.round(effectvalue);
      activeScale.style.width = effectvalue + '%';
      pin.style.left = effectvalue + '%';
      image.style.filter =
        STYLE_EFFECT[currentEffect] +
        `(${getEffectValue(effectvalue, currentEffect)})`;
    };

    element.querySelector('#effect-none').checked = true;
    scaleElement.classList.add('hidden');
    setValue();

    closeButton.addEventListener('click', () => {
      element.remove();
    });

    window.addEventListener('keydown', e => {
      if (e.keyCode === ESC_KEY_CODE) {
        if (
          document.activeElement === hashtagInput ||
          document.activeElement === commentInput
        ) {
          return;
        }
        element.remove();
      }
    });

    pin.addEventListener('mousedown', e => {
      e.preventDefault();
      const scaleRect = scale.getBoundingClientRect();
      const minX = scaleRect.left;
      const maxX = scaleRect.right;

      const onMouseMove = evt => {
        evt.preventDefault();
        let coordinateX = evt.clientX;

        coordinateX =
          coordinateX < minX ? minX : coordinateX > maxX ? maxX : coordinateX;

        this.effectvalue = ((coordinateX - minX) * 100) / scale.offsetWidth;
        setValue(this.effectvalue, this.currentEffect);
      };

      const onMouseUp = event => {
        event.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    Array.from(effectButtons).forEach(btn =>
      btn.addEventListener('click', e => {
        if (e.target.tagName === 'INPUT') {
          if (e.target.value === DEFAULT_CURRENT_EFFECT) {
            scaleElement.classList.add('hidden');
          } else {
            scaleElement.classList.remove('hidden');
          }
          this.effectValue = DEFAULT_EFFECT_VALUE;
          image.classList.remove(`effects__preview--${this.currentEffect}`);
          image.classList.add(`effects__preview--${e.target.value}`);
          this.currentEffect = e.target.value;
          image.style.filter = '';
          setValue(DEFAULT_EFFECT_VALUE, e.target.value);
        }
      }),
    );

    hashtagInput.addEventListener('input', e => {
      hashtagInput.setCustomValidity(validateHashtags(e.target.value));
    });
  }

  hide() {
    this.element.remove();
  }
}

export default ImageUpload;
