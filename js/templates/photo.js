import AbstractView from '../AbstractView';

class Photo extends AbstractView {
  constructor(data) {
    super();
    this.url = data.url;
    this.likes = data.likes;
    this.comments = data.comments;
  }

  get template() {
    return `<a href="#" class="picture">
    <img
      class="picture__img"
      src="${this.url}"
      width="182"
      height="182"
      alt="Случайная фотография"
    />
    <p class="picture__info">
      <span class="picture__comments">${this.comments.length}</span>
      <span class="picture__likes">${this.likes}</span>
    </p>
  </a>`;
  }

  bind() {
    this.element.querySelector('.picture').addEventListener('click', e => {
      this.onPhotoClick(e);
    });
  }

  onPhotoClick() {}
}
export default Photo;
