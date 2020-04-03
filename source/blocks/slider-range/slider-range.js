import 'ion-rangeslider';

class SliderRange {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
  }

  _initialize() {
    this.input = this.block.querySelector(`.js-${this.blockName}__input`);
    this.counter = this.block.querySelector(`.js-${this.blockName}__counter`);
    this._renderSlider();
  }

  _renderSlider() {
    const options = {
      skin: 'round',
      force_edges: true,
      hide_min_max: true,
      hide_from_to: true,
      onStart: (data) => this._updateCounter(data),
      onChange: (data) => this._updateCounter(data),
    };
    $(this.input).ionRangeSlider(options);
  }

  _updateCounter(data) {
    this.counter.textContent = `${data.from_pretty}\u20BD \u2013 ${data.to_pretty}\u20BD`;
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-slider-range');
  blocks.forEach((block) => new SliderRange(block));
}

export default renderBlocks();
