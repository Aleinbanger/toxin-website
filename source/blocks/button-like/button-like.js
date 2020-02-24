class ButtonLike {
  constructor(element) {
    this.element = element;
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.blockName = 'button-like';
    this.counter = this.element.querySelector(`.${this.blockName}__counter`);
    this.icon = this.element.querySelector(`.${this.blockName}__icon`);
  }

  _bindEventListeners() {
    this.element
      .addEventListener('click', () => this._handleButtonClick());
  }

  _handleButtonClick() {
    if (this.element.classList.contains(`${this.blockName}_active`)) {
      this.counter.textContent = Number(this.counter.textContent) - 1;
      this.icon.textContent = 'favorite_border';
    } else {
      this.counter.textContent = Number(this.counter.textContent) + 1;
      this.icon.textContent = 'favorite';
    }
    this.element.classList.toggle(`${this.blockName}_active`);
  }
}

function renderElements() {
  const elements = document.querySelectorAll('.js-button-like');
  elements.forEach((element) => new ButtonLike(element));
}

export default renderElements();
