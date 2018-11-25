import { getElementFromTemplate } from './utils';

class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Невозможно создать объект с таким именем`);
    }
  }

  get template() {
    throw new Error(`Не найден подходящий шаблон`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {}
}

export default AbstractView;
