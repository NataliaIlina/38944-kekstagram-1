import { renderPhotos } from './pictures';
import fileUploader from './templates/fileUploader';
import Loader from './loader/loader';

const pictures = document.querySelector('.pictures');

Loader.loadPhotos()
  .then(data => renderPhotos(data))
  .then(fragment => pictures.appendChild(fragment));

new fileUploader().show();
