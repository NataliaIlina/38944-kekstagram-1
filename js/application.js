import { renderPhotos } from './pictures';
import Loader from './loader/loader';
import fileUploader from './templates/fileUploader';

class Application {
  static init() {
    const pictures = document.querySelector('.pictures');
    new fileUploader().show();
    Loader.loadPhotos().then(data => {
      if (data) {
        pictures.appendChild(renderPhotos(data));
      }
    });
  }
}

export default Application;
