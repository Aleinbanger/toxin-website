class Rating {
  constructor(wrapper) {
    this.blockName = 'rating';
    this.block = wrapper.querySelector(`.js-${this.blockName}`);
    this._initialize();
  }

  updateState({ value }) {
    this.block.title = value;
    this._setState();
    this._renderState();
  }

  _initialize() {
    this.icons = this.block.querySelectorAll(`.js-${this.blockName}__icon`);
    this._setState();
    this._renderState();
  }

  _setState() {
    this.state = {
      value: Number(this.block.title),
    };
  }

  _renderState() {
    let j = this.state.value;
    this.icons.forEach((i) => {
      const icon = i;
      icon.textContent = (j > 0) ? 'star' : 'star_border';
      j -= 1;
    });
  }
}

export default Rating;
