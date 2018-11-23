import { TOTAL_PICTURES_NUMBER, COMMENTS, DESCRIPTIONS } from './constants';
import {
  getNumbersArray,
  getRandomNumber,
  getElementFromTemplate,
  getUniqueArrayElement,
} from './utils';
import photoTemplate from './templates/photo';
import commentTemplate from './templates/comment';

const getPhotosArr = () => {
  //массив чисел для url
  const photoNumbers = getNumbersArray(1, TOTAL_PICTURES_NUMBER);
  // массив картинок
  let photos = [];
  for (let i = 0; i < TOTAL_PICTURES_NUMBER; i++) {
    photos.push({
      url: `photos/${getUniqueArrayElement(photoNumbers)}.jpg`,
      likes: getRandomNumber(15, 200),
      comments: COMMENTS[getRandomNumber(0, COMMENTS.length - 1)],
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
    });
  }
  return photos;
};

export const renderPhotos = () => {
  const fragment = document.createDocumentFragment();
  const photos = getPhotosArr();
  const bigPicture = document.querySelector('.big-picture');
  const image = bigPicture.querySelector('.big-picture__img img');
  const likesBlock = bigPicture.querySelector('.likes-count');
  const commentsBlock = bigPicture.querySelector('.comments-count');

  photos.forEach(photo => {
    const photoElement = getElementFromTemplate(
      photoTemplate(photo.url, photo.likes, photo.comments.length),
    );

    photoElement.addEventListener('click', e => {
      e.preventDefault();
      bigPicture.classList.remove('hidden');
      image.setAttribute('src', photo.url);
      likesBlock.innerHTML = photo.likes;
      commentsBlock.innerHTML = photo.comments.length;
      console.log(photo.likes);
    });

    fragment.appendChild(photoElement);
  });
  return fragment;
};
