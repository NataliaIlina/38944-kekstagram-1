import { renderPhotos } from './pictures';
import fileUploader from './templates/fileUploader';
const pictures = document.querySelector('.pictures');

new fileUploader().show();
pictures.appendChild(renderPhotos());
