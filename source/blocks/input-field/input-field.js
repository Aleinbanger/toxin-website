import Inputmask from 'inputmask';

class InputField {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
  }

  _initialize() {
    this.field = this.block.querySelector(`.js-${this.blockName}__field`);
    this._applyMask();
  }

  _applyMask() {
    Inputmask().mask(this.field);
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-input-field');
  blocks.forEach((block) => new InputField(block));
}

export default renderBlocks();
