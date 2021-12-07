import InputField from '../input-field/InputField';

class CardSignup {
  constructor(block) {
    this.blockName = 'card-signup';
    this.block = block;
    this._initialize();
  }

  _initialize() {
    this.input = this.block.querySelector(`.js-${this.blockName}__masked-input`);
    this.inputField = new InputField(this.input);
  }
}

export default CardSignup;
