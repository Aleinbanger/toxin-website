class ListCheckbox {
  constructor(element) {
    this.element = element;
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.blockName = 'list-checkbox';
    this.btn = this.element.querySelector(`.${this.blockName}__header`);
    this.icon = this.element.querySelector(`.${this.blockName}__icon`);
    this.list = this.element.querySelector(`.${this.blockName}__list`);
    this.list.classList.add(`${this.blockName}__list_inactive`);
  }

  _bindEventListeners() {
    this.btn
      .addEventListener('click', () => this._handleButtonClick());
  }

  _handleButtonClick() {
    this.icon.classList.toggle(`${this.blockName}__icon_rotated`);
    this.list.classList.toggle(`${this.blockName}__list_inactive`);
  }
}

function renderElements() {
  const elements = document.querySelectorAll('.js-list-checkbox');
  elements.forEach((element) => new ListCheckbox(element));
}

export default renderElements();
