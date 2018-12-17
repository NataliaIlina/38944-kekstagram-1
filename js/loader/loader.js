import ErrorModal from '../templates/errorModal';

const SERVER_URL = `https://js.dump.academy/kekstagram`;

class Loader {
  static async loadPhotos() {
    const response = await fetch(`${SERVER_URL}/data`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(response.status);
    }
  }

  static async uploadImage(data) {
    const response = await fetch(SERVER_URL, {
      method: `POST`,
      body: data,
    });
    if (response.ok) {
      return response;
    } else {
      new ErrorModal(response.status).show();
    }
  }
}

export default Loader;
