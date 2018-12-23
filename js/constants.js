export const TOTAL_PICTURES_NUMBER = 25;
export const DEFAULT_EFFECT_VALUE = 100;
export const DEFAULT_CURRENT_EFFECT = 'none';
export const DEFAULT_SIZE = 100;
export const MAX_SIZE = 100;
export const MIN_SIZE = 25;
export const SIZE_STEP = 25;
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
  none: 'none',
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
