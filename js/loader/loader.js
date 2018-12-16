import { loadData, onError, checkStatus } from './load-utils';

const SERVER_URL = `https://js.dump.academy/kekstagram`;

class Loader {
  static loadPhotos() {
    return loadData(`${SERVER_URL}/data`);
  }

  static uploadImage(data) {
    return fetch(SERVER_URL, {
      method: `POST`,
      body: data,
    })
      .then(checkStatus)
      .catch(onError);
  }
}

export default Loader;
