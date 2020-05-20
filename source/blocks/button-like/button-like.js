import './button-like.scss';

class ButtonLike {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
    this._bindEventListeners();
  }

  updateState({ value, active }) {
    this.state.value = value;
    this.state.active = active;
    this._renderState();
  }

  _initialize() {
    this.icon = this.block.querySelector(`.js-${this.blockName}__icon`);
    this.counter = this.block.querySelector(`.js-${this.blockName}__counter`);
    this.state = {
      value: Number(this.block.title),
      active: Boolean(this.block.dataset.active),
    };
    this._renderState();
  }

  _bindEventListeners() {
    this.block.addEventListener('click', () => this._handleButtonClick());
  }

  _handleButtonClick() {
    if (this.state.active) {
      this.state.value -= 1;
    } else {
      this.state.value += 1;
    }
    this.state.active = !this.state.active;
    this._renderState();
  }

  _renderState() {
    if (this.state.active) {
      this.block.dataset.active = this.state.active;
      this.block.classList.add(`${this.blockName}_active`);
      this.icon.textContent = 'favorite';
    } else {
      delete this.block.dataset.active;
      this.block.classList.remove(`${this.blockName}_active`);
      this.icon.textContent = 'favorite_border';
    }
    this._updateCounter();
  }

  _updateCounter() {
    this.block.title = this.state.value;
    this.counter.textContent = this.state.value;
  }
}

export default ButtonLike;
