import AbstractView from '../AbstractView';
import ImageUpload from './imageUpload';
import Loader from '../loader/loader';
import SuccessModal from './successModal';

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
        autocomplete="off"
        method="post"
        enctype="multipart/form-data"
        action="https://js.dump.academy/kekstagram"
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
    const imagePreview = new ImageUpload();

    input.addEventListener('change', () => {
      form.appendChild(imagePreview.element);
    });

    form.addEventListener('submit', evt => {
      evt.preventDefault();
      const data = new FormData(form);
      Loader.uploadImage(data).then(data => {
        imagePreview.hide();
        if (data) {
          new SuccessModal().show();
        }
      });
    });
  }

  show() {
    document.querySelector('.pictures').appendChild(this.element.firstChild);
  }
}

export default fileUploader;
