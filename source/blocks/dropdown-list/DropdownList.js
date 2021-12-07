import InputField from '../input-field/InputField';
import DropdownListItem from './DropdownListItem';

class DropdownList {
  constructor(block) {
    this.blockName = 'dropdown-list';
    this.block = block;
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.input = this.block.querySelector(`.js-${this.blockName}__input`);
    this.inputField = new InputField(this.input);
    this.list = this.block.querySelector(`.js-${this.blockName}__list`);
    this.resetButton = this.list.querySelector(`.js-${this.blockName}__button[data-action="reset"]`);
    this.acceptButton = this.list.querySelector(`.js-${this.blockName}__button[data-action="accept"]`);
    this.state = {
      totalValue: [],
      active: Boolean(this.block.dataset.active),
    };
    this._renderListItems();
    this._renderState();
  }

  _renderListItems() {
    this.items = [];
    const items = this.list.querySelectorAll(`.js-${this.blockName}__item`);
    items.forEach((item) => this.items.push(new DropdownListItem(item)));
  }

  _bindEventListeners() {
    this.input.addEventListener('mousedown', (event) => this._handleInputMouseDown(event));
    this.input.addEventListener('focusin', () => this._handleInputFocusIn());
    this.handleOutsideClick = (event) => this._handleOutsideClick(event);

    if (this.resetButton) {
      this.resetButton.addEventListener('click', () => this._handleResetButtonClick());
    }
    if (this.acceptButton) {
      this.acceptButton.addEventListener('click', () => this._handleAcceptButtonClick());
    }
  }

  _handleInputMouseDown(event) {
    if (document.activeElement === this.inputField.field) {
      this.state.active = !this.state.active;
      this._renderState();
    } else if (this.state.active) {
      event.preventDefault();
      this.state.active = false;
      this._renderState();
    }
  }

  _handleInputFocusIn() {
    if (!this.state.active) {
      this.state.active = true;
      this._renderState();
    }
  }

  _handleOutsideClick(event) {
    const isClickInside = this.block.contains(event.target);
    if (!isClickInside && this.state.active) {
      this.state.active = false;
      this._renderState();
    }
  }

  _handleResetButtonClick() {
    this.items.forEach((item) => {
      const { element } = item;
      element.dataset.value = 0;
    });
    this._renderListItems();
    this._renderState();
  }

  _handleAcceptButtonClick() {
    this.state.active = false;
    this._renderState();
  }

  _renderState() {
    if (this.state.active) {
      document.addEventListener('click', this.handleOutsideClick);
      this.list.classList.add(`${this.blockName}__list_active`);
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
      this.list.classList.remove(`${this.blockName}__list_active`);
    }
    this.inputField.setState({ active: this.state.active });
    this._updateTotalValue();
    this._toggleResetButton();
  }

  _updateTotalValue() {
    this.state.totalValue = [];
    const combinedItems = this.items.filter((item) => item.state.combined === true);
    if (combinedItems.length !== 0) {
      const combinedItem = new DropdownListItem(combinedItems[0].element.cloneNode(true));
      combinedItems.slice(1).forEach((item) => {
        combinedItem.state.value += item.state.value;
        combinedItem.state.names = item.state.names;
      });
      combinedItem.updateListItemName(combinedItem.state);
      if (combinedItem.state.value !== 0) {
        this.state.totalValue.push(`${combinedItem.state.value} ${combinedItem.state.name}`);
      }
    }
    this.items.forEach((item) => {
      if (!item.state.combined && item.state.value !== 0) {
        this.state.totalValue.push(`${item.state.value} ${item.state.name}`);
      }
    });
    this.inputField.setState({ value: this.state.totalValue.join(', ') });
  }

  _toggleResetButton() {
    if (this.resetButton) {
      if (!this.inputField.state.value) {
        this.resetButton.classList.add(`${this.blockName}__button_inactive`);
      } else {
        this.resetButton.classList.remove(`${this.blockName}__button_inactive`);
      }
    }
  }
}

export default DropdownList;
