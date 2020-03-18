class ButtonLike {
  constructor(block) {
    this.block = block;
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.blockName = 'button-like';
    this.counter = this.block.querySelector(`.js-${this.blockName}__counter`);
    this.icon = this.block.querySelector(`.js-${this.blockName}__icon`);
  }

  _bindEventListeners() {
    this.block.addEventListener('click', () => this._handleButtonClick());
  }

  _handleButtonClick() {
    if (this.block.classList.contains(`${this.blockName}_active`)) {
      this.counter.textContent = Number(this.counter.textContent) - 1;
      this.icon.textContent = 'favorite_border';
    } else {
      this.counter.textContent = Number(this.counter.textContent) + 1;
      this.icon.textContent = 'favorite';
    }
    this.block.classList.toggle(`${this.blockName}_active`);
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-button-like');
  blocks.forEach((block) => new ButtonLike(block));
}

export default renderBlocks();
