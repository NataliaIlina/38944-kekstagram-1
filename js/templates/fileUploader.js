import AbstractView from '../AbstractView';
import ImageUpload from './imageUpload';

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
        action="https://js.dump.academy/kekstagram"
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
      </form>
    </div>
  </section>`;
  }

  bind(element) {
    const form = element.querySelector('.img-upload__form');
    const input = element.querySelector('#upload-file');

    input.addEventListener('change', () => {
      form.appendChild(new ImageUpload().element);
    });
  }

  show() {
    document.querySelector('.pictures').appendChild(this.element.firstChild);
  }
}

export default fileUploader;
