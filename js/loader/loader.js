import { loadData } from './load-utils';

const SERVER_URL = `https://js.dump.academy/kekstagram/data`;

class Loader {
  static loadPhotos() {
    return loadData(SERVER_URL);
  }
}

export default Loader;
