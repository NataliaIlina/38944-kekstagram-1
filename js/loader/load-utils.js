//import ErrorView from './error-view';

const checkStatus = response => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = response => response.json();
// обработчик ошибок
const onError = error => {
  //const errorPopup = new ErrorView(error).element;
  //document.body.insertAdjacentElement(`afterbegin`, errorPopup);
};

// грузим данные с адреса
const loadData = url => {
  return fetch(url)
    .then(checkStatus)
    .then(toJSON);
};

export { checkStatus, onError, loadData, preloadImages };
