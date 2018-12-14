import { ERROR } from './constants';

export const getRandomNumber = (min, max) => {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

export const getNumbersArray = (firstNumber, lastNamber) => {
  let arr = [];
  for (let i = firstNumber; i <= lastNamber; i++) {
    arr.push(i);
  }
  return arr;
};

export const getElementFromTemplate = template => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element;
};

export const getUniqueArrayElement = array => {
  return array.splice(getRandomNumber(0, array.length - 1), 1);
};

const checkFirstSimbol = hashtags => hashtags.every(tag => tag[0] === '#');
const checkMinLength = hashtags => hashtags.every(tag => tag.length >= 2);
const checkMaxLength = hashtags => hashtags.every(tag => tag.length < 20);
const checkTagsAmount = hashtags => hashtags.length <= 5;
const checkUnique = hashtags => {
  const unique = {};
  hashtags.forEach(tag => {
    let el = tag;
    unique[el] = true;
  });
  return Object.keys(unique).length === hashtags.length;
};

export const validateHashtags = value => {
  let hashtags = value
    .toLowerCase()
    .trim()
    .split(' ');
  hashtags = hashtags.filter(Boolean);

  if (!checkFirstSimbol(hashtags)) {
    return ERROR['firstSymbol'];
  }
  if (!checkMinLength(hashtags)) {
    return ERROR['tooShort'];
  }
  if (!checkMaxLength(hashtags)) {
    return ERROR['tooLong'];
  }
  if (!checkTagsAmount(hashtags)) {
    return ERROR['manyTags'];
  }
  if (!checkUnique(hashtags)) {
    return ERROR['notUnique'];
  }
  return '';
};

export const getEffectValue = (percent, effect) => {
  if (effect === 'chrome' || effect === 'sepia') {
    return percent / 100;
  } else if (effect === 'phobos') {
    return (percent * 3) / 100 + 'px';
  } else if (effect === 'heat') {
    return (percent * 2) / 100 + 1;
  }
  return percent + '%';
};

export const getLeftCoord = elem => {
  var box = elem.getBoundingClientRect();
  return box.left + pageXOffset;
};
