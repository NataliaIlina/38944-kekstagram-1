import Photo from './templates/photo';
import bigPhoto from './templates/bigPhoto';

export const renderPhotos = photos => {
  const fragment = document.createDocumentFragment();

  photos.forEach(photo => {
    const picture = new Photo(photo);
    picture.onPhotoClick = e => {
      e.preventDefault();
      new bigPhoto(photo).show();
      document.querySelector('body').classList.add('modal-open');
    };
    fragment.appendChild(picture.element);
  });
  return fragment;
};
