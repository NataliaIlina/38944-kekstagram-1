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

export const checkFirstSimbol = hashtags =>
  hashtags.every(tag => tag[0] === '#');
export const checkMinLength = hashtags =>
  hashtags.every(tag => tag.length >= 2);
export const checkMaxLength = hashtags =>
  hashtags.every(tag => tag.length < 20);
export const checkTagsAmount = hashtags => hashtags.length <= 5;
export const checkUnique = hashtags => {
  const unique = {};
  hashtags.forEach(tag => {
    let el = tag;
    unique[el] = true;
  });
  console.log(Object.keys(unique));
  return Object.keys(unique).length === hashtags.length;
};
