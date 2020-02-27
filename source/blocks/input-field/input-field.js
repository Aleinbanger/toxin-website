import Inputmask from 'inputmask';

class InputField {
  constructor(element) {
    this.element = element;
    this._initialize();
  }

  _initialize() {
    this.blockName = 'input-field';
    this.field = this.element.querySelector(`.${this.blockName}__field`);
    this._applyMask();
  }

  _applyMask() {
    Inputmask().mask(this.field);
  }
}

function renderElements() {
  const elements = document.querySelectorAll('.js-input-field');
  elements.forEach((element) => new InputField(element));
}

export default renderElements();
