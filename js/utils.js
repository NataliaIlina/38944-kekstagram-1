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
