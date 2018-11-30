import AbstractView from '../AbstractView';
import { EFFECTS, ESC_KEY_CODE } from '../constants';

class fileUploader extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="img-upload">
    <div class="img-upload__wrapper">
      <h2 class="img-upload__title  visually-hidden">
        Загрузка фотографии
      </h2>
      <form
        class="img-upload__form"
        id="upload-select-image"
        method="post"
        enctype="multipart/form-data"
        autocomplete="off"
      >
        <!-- Изначальное состояние поля для загрузки изображения -->
        <fieldset class="img-upload__start">
          <input
            type="file"
            id="upload-file"
            class="img-upload__input  visually-hidden"
            name="filename"
            required
          />
          <label
            for="upload-file"
            class="img-upload__label  img-upload__control"
            >Загрузить</label
          >
        </fieldset>

        <!-- Форма редактирования изображения -->
        <div class="img-upload__overlay  hidden">
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
                  value="55%"
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
              <div class="img-upload__preview">
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
                  value="20"
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
        </div>
      </form>
    </div>
  </section>`;
  }

  bind() {
    const form = this.element.querySelector('.img-upload__form');
    const input = form.querySelector('#upload-file');
    const closeButton = form.querySelector('#upload-cancel');
    const imageWrapper = form.querySelector('.img-upload__overlay');
    const image = form.querySelector('.img-upload__preview');
    const effectButtons = form.querySelectorAll('.effects__item');
    let currentEffect = 'none';

    input.addEventListener('change', () => {
      imageWrapper.classList.remove('hidden');
    });
    closeButton.addEventListener('click', () => {
      imageWrapper.classList.add('hidden');
    });
    window.addEventListener('keydown', e => {
      if (e.keyCode === ESC_KEY_CODE) {
        imageWrapper.classList.add('hidden');
      }
    });
    Array.from(effectButtons).forEach(btn =>
      btn.addEventListener('click', e => {
        if (e.target.tagName === 'INPUT') {
          image.classList.remove(`effects__preview--${currentEffect}`);
          image.classList.add(`effects__preview--${e.target.value}`);
          currentEffect = e.target.value;
        }
      }),
    );
  }

  show() {
    document.querySelector('.pictures').appendChild(this.element.firstChild);
  }
}

export default fileUploader;
