export const TOTAL_PICTURES_NUMBER = 25;
export const DEFAULT_EFFECT_VALUE = 100;
export const DEFAULT_CURRENT_EFFECT = 'none';
export const DEFAULT_SIZE = 100;
export const MAX_SIZE = 100;
export const MIN_SIZE = 25;
export const SIZE_STEP = 25;

export const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

export const DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!',
];

export const ESC_KEY_CODE = 27;

export const EFFECTS = [
  {
    name: 'none',
    label: 'Оригинал',
  },
  {
    name: 'chrome',
    label: 'Хром',
  },
  {
    name: 'sepia',
    label: 'Сепия',
  },
  {
    name: 'marvin',
    label: 'Марвин',
  },
  {
    name: 'phobos',
    label: 'Фобос',
  },
  {
    name: 'heat',
    label: 'Зной',
  },
];

export const STYLE_EFFECT = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness',
};

export const ERROR = {
  firstSymbol: 'Хэштег должен начинаться с символа #',
  tooShort: 'Хэштег должен содержать минимум 2 символа',
  tooLong: 'Хэштег должен содержать максимум 20 символов',
  notUnique: 'Хэштеги не должны повторяться',
  manyTags: 'Допускается добавление не более 5 хэштегов',
};
