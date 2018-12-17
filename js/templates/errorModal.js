import AbstractView from '../AbstractView';

class ErrorModal extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `<section class="error">
    <div class="error__inner">
      <h2 class="error__title">Ошибка загрузки данных:<br /> ${this.error}</h2>
      <div class="error__buttons">
        <button type="button" class="error__button">
          Попробовать снова
        </button>
        <button type="button" class="error__button">
          Загрузить другой файл
        </button>
      </div>
    </div>
  </section>`;
  }

  bind(element) {
    const buttons = element.querySelectorAll('.error__button');

    Array.from(buttons).forEach(button =>
      button.addEventListener('click', () => element.remove()),
    );
  }

  show() {
    document.body.insertAdjacentElement(`afterbegin`, this.element);
  }
}

export default ErrorModal;
