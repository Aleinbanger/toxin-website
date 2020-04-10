/* eslint-disable no-alert */
class CardForm {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.form = this.block.querySelector(`.js-${this.blockName}__form`);
    this.formItems = this.form.querySelectorAll(`.js-${this.blockName}__form-item`);
  }

  _bindEventListeners() {
    this.form.addEventListener('submit', (event) => this._validateForm(event));
  }

  _validateForm(event) {
    const isEmpty = (item) => item.dataset.required
      && item.querySelector('input').value === '';
    if (Array.from(this.formItems).some(isEmpty)) {
      event.preventDefault();
      alert('Пожалуйста, заполните форму!');
    }
  }
}

export default CardForm;
