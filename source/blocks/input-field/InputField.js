import Inputmask from 'inputmask';

class InputField {
  constructor(wrapper) {
    this.blockName = 'input-field';
    this.block = wrapper.querySelector(`.js-${this.blockName}`);
    this._initialize();
  }

  setState({ active, value }) {
    if (typeof active !== 'undefined') {
      this.state.active = active;
    }
    if (typeof value !== 'undefined') {
      this.state.value = value;
    }
    this._renderState();
  }

  _initialize() {
    this.field = this.block.querySelector(`.js-${this.blockName}__field`);
    this.icon = this.block.querySelector(`.js-${this.blockName}__icon`);
    this.state = {
      active: false,
      value: undefined,
    };
    this._renderState();
    if (this.field.dataset.inputmask) {
      this._applyMask();
    }
  }

  _applyMask() {
    Inputmask().mask(this.field);
  }

  _renderState() {
    if (this.state.active) {
      this.field.classList.add(`${this.blockName}__field_active`);
      if (this.icon) {
        this.icon.classList.add(`${this.blockName}__icon_active`);
      }
    } else {
      this.field.classList.remove(`${this.blockName}__field_active`);
      if (this.icon) {
        this.icon.classList.remove(`${this.blockName}__icon_active`);
      }
    }
    if (typeof this.state.value !== 'undefined') {
      this.field.value = this.state.value;
      this.field.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}

export default InputField;
