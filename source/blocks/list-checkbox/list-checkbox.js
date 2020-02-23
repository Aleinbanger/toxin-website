class ListCheckbox {
  constructor(element) {
    this.element = element;
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.btn = this.element.querySelector('.list-checkbox__header');
    this.icon = this.element.querySelector('.list-checkbox__icon');
    this.list = this.element.querySelector('.list-checkbox__list');
    this.list.classList.add('list-checkbox__list_inactive');
  }

  _bindEventListeners() {
    this.btn
      .addEventListener('click', () => this._handleButtonClick());
  }

  _handleButtonClick() {
    this.icon.classList.toggle('list-checkbox__icon_rotated');
    this.list.classList.toggle('list-checkbox__list_inactive');
  }
}

function renderElements() {
  const elements = document.querySelectorAll('.js-list-checkbox');
  elements.forEach((element) => new ListCheckbox(element));
}

export default renderElements();
