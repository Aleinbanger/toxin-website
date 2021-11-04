/* eslint-disable prefer-destructuring */

class DropdownListItem {
  constructor(element) {
    this.elementName = 'dropdown-list__item';
    this.element = element;
    this._initialize();
    this._bindEventListeners();
  }

  updateListItemName({ value, names }) {
    switch (value) {
      case 0:
        return;
      case 1:
        this.state.name = names[0];
        break;
      case 2:
      case 3:
      case 4:
        this.state.name = names[1];
        break;
      default:
        this.state.name = names[2];
    }
  }

  _initialize() {
    [this.minusButton, this.plusButton] = this.element.querySelectorAll(`.js-${this.elementName}-button`);
    this.counter = this.element.querySelector(`.js-${this.elementName}-counter`);
    this.state = {
      name: '',
      names: this.element.dataset.names.split(','),
      value: Number(this.element.dataset.value),
      minValue: Number(this.element.dataset.minValue),
      maxValue: Number(this.element.dataset.maxValue),
      combined: Boolean(this.element.dataset.combined),
    };
    this._renderState();
  }

  _bindEventListeners() {
    this.minusButton.addEventListener('click', () => this._handleMinusButtonClick());
    this.plusButton.addEventListener('click', () => this._handlePlusButtonClick());
  }

  _handleMinusButtonClick() {
    this.state.value = (this.state.value <= this.state.minValue)
      ? this.state.minValue : this.state.value - 1;
    this._renderState();
  }

  _handlePlusButtonClick() {
    this.state.value = (this.state.value >= this.state.maxValue)
      ? this.state.maxValue : this.state.value + 1;
    this._renderState();
  }

  _renderState() {
    this.updateListItemName(this.state);
    this._updateCounter();
    this._toggleButtons();
  }

  _updateCounter() {
    this.element.dataset.value = this.state.value;
    this.counter.textContent = this.state.value;
  }

  _toggleButtons() {
    if (this.state.value <= this.state.minValue) {
      this.minusButton.disabled = true;
    } else if (this.state.value >= this.state.maxValue) {
      this.plusButton.disabled = true;
    } else {
      this.minusButton.disabled = false;
      this.plusButton.disabled = false;
    }
  }
}

export default DropdownListItem;
