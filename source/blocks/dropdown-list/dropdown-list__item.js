class DropdownListItem {
  constructor(element) {
    this.element = element;
    this.elementName = this.element.classList[0];
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
    [this.minusBtn, this.plusBtn] = this.element.querySelectorAll(`.js-${this.elementName}-btn`);
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
    this.minusBtn.addEventListener('click', () => this._handleMinusButtonClick());
    this.plusBtn.addEventListener('click', () => this._handlePlusButtonClick());
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
      this.minusBtn.disabled = true;
    } else if (this.state.value >= this.state.maxValue) {
      this.plusBtn.disabled = true;
    } else {
      this.minusBtn.disabled = false;
      this.plusBtn.disabled = false;
    }
  }
}

export default DropdownListItem;
