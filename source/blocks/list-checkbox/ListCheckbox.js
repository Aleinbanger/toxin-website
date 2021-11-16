class ListCheckbox {
  constructor(block) {
    this.blockName = 'list-checkbox';
    this.block = block;
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.header = this.block.querySelector(`.js-${this.blockName}__header`);
    this.icon = this.header.querySelector(`.js-${this.blockName}__icon`);
    this.list = this.block.querySelector(`.js-${this.blockName}__list`);
    this.state = {
      active: Boolean(this.block.dataset.active),
    };
    this._renderState();
  }

  _bindEventListeners() {
    this.header.addEventListener('mousedown', (event) => this._handleHeaderMouseDown(event));
    this.header.addEventListener('focusin', () => this._handleHeaderFocusIn());
  }

  _handleHeaderMouseDown(event) {
    if (document.activeElement === this.header) {
      this.state.active = !this.state.active;
      this._renderState();
    } else if (this.state.active) {
      event.preventDefault();
      this.state.active = false;
      this._renderState();
    }
  }

  _handleHeaderFocusIn() {
    if (!this.state.active) {
      this.state.active = true;
      this._renderState();
    }
  }

  _renderState() {
    if (this.state.active) {
      this.icon.classList.add(`${this.blockName}__icon_active`);
      this.list.classList.remove(`${this.blockName}__list_inactive`);
    } else {
      this.icon.classList.remove(`${this.blockName}__icon_active`);
      this.list.classList.add(`${this.blockName}__list_inactive`);
    }
  }
}

export default ListCheckbox;
