/* eslint-disable prefer-destructuring */
class DropdownListItem {
  constructor(element) {
    this.element = element;
    this._initialize();
    this._bindEventListeners();
  }

  updateListItemName({ value, names }) {
    switch (value) {
      case 0:
        return;
      case 1:
        this.name = names[0];
        break;
      case 2:
      case 3:
      case 4:
        this.name = names[1];
        break;
      default:
        this.name = names[2];
    }
  }

  _initialize() {
    this.elementName = 'dropdown-list__item';
    [this.minusBtn, this.plusBtn] = this.element.querySelectorAll(`.js-${this.elementName}-btn`);
    this.counter = this.element.querySelector(`.js-${this.elementName}-counter`);
    this.value = Number(this.element.dataset.value);
    this.minValue = Number(this.element.dataset.minValue);
    this.maxValue = Number(this.element.dataset.maxValue);
    this.names = this.element.dataset.names.split(',');
    this.combined = Boolean(this.element.dataset.combined);
    this.updateListItemName(this);
    this._updateCounter();
    this._toggleButtons();
  }

  _bindEventListeners() {
    this.minusBtn.addEventListener('click', () => this._handleMinusButtonClick());
    this.plusBtn.addEventListener('click', () => this._handlePlusButtonClick());
  }

  _handleMinusButtonClick() {
    this.value = (this.value <= this.minValue) ? this.minValue : this.value - 1;
    this.updateListItemName(this);
    this._updateCounter();
    this._toggleButtons();
  }

  _handlePlusButtonClick() {
    this.value = (this.value >= this.maxValue) ? this.maxValue : this.value + 1;
    this.updateListItemName(this);
    this._updateCounter();
    this._toggleButtons();
  }

  _updateCounter() {
    this.element.dataset.value = this.value;
    this.counter.textContent = this.value;
  }

  _toggleButtons() {
    if (this.value <= this.minValue) {
      this.minusBtn.disabled = true;
    } else if (this.value >= this.maxValue) {
      this.plusBtn.disabled = true;
    } else {
      this.minusBtn.disabled = false;
      this.plusBtn.disabled = false;
    }
  }
}

export default DropdownListItem;
