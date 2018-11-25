import { TOTAL_PICTURES_NUMBER, COMMENTS, DESCRIPTIONS } from './constants';
import {
  getNumbersArray,
  getRandomNumber,
  getUniqueArrayElement,
} from './utils';
import Photo from './templates/photo';
import bigPhoto from './templates/bigPhoto';

const getPhotosArr = () => {
  //массив чисел для url
  const photoNumbers = getNumbersArray(1, TOTAL_PICTURES_NUMBER);

  // массив картинок
  let photos = [];
  for (let i = 0; i < TOTAL_PICTURES_NUMBER; i++) {
    //массив комментариев
    const comments = [];
    for (let i = 0; i < getRandomNumber(1, 2); i++) {
      comments.push(COMMENTS[getRandomNumber(0, COMMENTS.length - 1)]);
    }
    photos.push({
      url: `photos/${getUniqueArrayElement(photoNumbers)}.jpg`,
      likes: getRandomNumber(15, 200),
      comments: comments,
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
    });
  }
  return photos;
};

export const renderPhotos = () => {
  const fragment = document.createDocumentFragment();
  const photos = getPhotosArr();

  photos.forEach(photo => {
    const picture = new Photo(photo);
    picture.onPhotoClick = e => {
      e.preventDefault();
      new bigPhoto(photo).show();
    };
    fragment.appendChild(picture.element);
  });
  return fragment;
};
