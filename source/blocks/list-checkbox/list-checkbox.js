class ListCheckbox {
  constructor(block) {
    this.block = block;
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.blockName = 'list-checkbox';
    this.btn = this.block.querySelector(`.js-${this.blockName}__header`);
    this.icon = this.block.querySelector(`.js-${this.blockName}__icon`);
    this.list = this.block.querySelector(`.js-${this.blockName}__list`);
    this.list.classList.add(`${this.blockName}__list_inactive`);
  }

  _bindEventListeners() {
    this.btn.addEventListener('click', () => this._handleButtonClick());
  }

  _handleButtonClick() {
    this.icon.classList.toggle(`${this.blockName}__icon_rotated`);
    this.list.classList.toggle(`${this.blockName}__list_inactive`);
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-list-checkbox');
  blocks.forEach((block) => new ListCheckbox(block));
}

export default renderBlocks();
