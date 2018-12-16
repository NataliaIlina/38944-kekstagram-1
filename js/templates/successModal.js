import AbstractView from '../AbstractView';

class SuccessModal extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `<section class="success">
    <div class="success__inner">
      <h2 class="success__title">Изображение успешно загружено</h2>
      <button type="button" class="success__button">Круто!</button>
    </div>
  </section>`;
  }

  bind(element) {
    const closeButton = element.querySelector('.success__button');

    closeButton.addEventListener('click', () => {
      element.remove();
    });
  }
}

export default SuccessModal;
