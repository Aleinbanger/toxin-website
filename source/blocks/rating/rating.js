class Rating {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
  }

  _initialize() {
    this.icons = this.block.querySelectorAll(`.js-${this.blockName}__icon`);
    this.state = {
      value: Number(this.block.title),
    };
    this._renderState();
  }

  _renderState() {
    let j = this.state.value;
    this.icons.forEach((icon) => {
      const i = icon;
      i.textContent = (j > 0) ? 'star' : 'star_border';
      j -= 1;
    });
  }
}

export default Rating;
