class Rating {
  constructor(block) {
    this.block = block;
    this._initialize();
  }

  _initialize() {
    this.blockName = 'rating';
    this.icons = this.block.querySelectorAll(`.js-${this.blockName}__icon`);
    this.value = Number(this.block.title);
    this._displayRating();
  }

  _displayRating() {
    let j = this.value;
    this.icons.forEach((icon) => {
      const i = icon;
      i.textContent = (j > 0) ? 'star' : 'star_border';
      j -= 1;
    });
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-rating');
  blocks.forEach((block) => new Rating(block));
}

export default renderBlocks();
