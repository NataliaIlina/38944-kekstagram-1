import AbstractView from '../AbstractView';
import { getRandomNumber } from '../utils';
import { ESC_KEY_CODE } from '../constants';

class bigPhoto extends AbstractView {
  constructor(data) {
    super();
    this.url = data.url;
    this.likes = data.likes;
    this.comments = data.comments;
  }

  get template() {
    return `<section class="big-picture  overlay">
    <h2 class="big-picture__title  visually-hidden">Просмотр фотографии</h2>
    <div class="big-picture__preview">
      <!-- Просмотр изображения -->
      <div class="big-picture__img">
        <img
          src="${this.url}"
          alt="Девушка в купальнике"
          width="600"
          height="600"
        />
      </div>
  
      <!--
        Информация об изображении. Подпись, комментарии, количество лайков
      -->
      <div class="big-picture__social  social">
        <div class="social__header">
          <img
            class="social__picture"
            src="img/avatar-1.svg"
            alt="Аватар автора фотографии"
            width="35"
            height="35"
          />
          <p class="social__caption">Тестим новую камеру! =)</p>
          <p class="social__likes">
            Нравится <span class="likes-count">${this.likes}</span>
          </p>
        </div>
  
        <!-- Комментарии к изображению -->
        <div class="social__comment-count">
          ${this.comments.length} из <span class="comments-count">${
      this.comments.length
    }</span> комментариев
        </div>
        <ul class="social__comments">
        ${this.comments
          .map(
            comment => `<li class="social__comment">
                <img
                  class="social__picture"
                  src="${comment.avatar}"
                  alt="${comment.name}"
                  width="35"
                  height="35"
                />
                <p class="social__text">${comment.message}</p>
              </li>`,
          )
          .join('')}
        </ul>
  
        <!-- Кнопка для загрузки новой порции комментариев -->
        <button
          type="button"
          class="social__comments-loader  comments-loader"
        >
          Загрузить еще
        </button>
  
        <!-- Форма для отправки комментария -->
        <div class="social__footer">
          <img
            class="social__picture"
            src="img/avatar-6.svg"
            alt="Аватар комментатора фотографии"
            width="35"
            height="35"
          />
          <input
            type="text"
            class="social__footer-text"
            placeholder="Ваш комментарий..."
          />
          <button type="button" class="social__footer-btn" name="button">
            Отправить
          </button>
        </div>
      </div>
  
      <!-- Кнопка для выхода из полноэкранного просмотра изображения -->
      <button
        type="reset"
        class="big-picture__cancel  cancel"
        id="picture-cancel"
      >
        Закрыть
      </button>
    </div>
  </section>`;
  }

  bind() {
    this.element
      .querySelector('.big-picture__cancel')
      .addEventListener('click', e => {
        e.preventDefault();
        this.hide();
      });
    window.addEventListener('keydown', e => {
      if (e.keyCode === ESC_KEY_CODE) {
        e.preventDefault();
        this.hide();
      }
    });
  }

  show() {
    document.querySelector('main').appendChild(this.element);
  }

  hide() {
    this.element.remove();
    document.querySelector('body').classList.remove('modal-open');
  }
}
export default bigPhoto;
