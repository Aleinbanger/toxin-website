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
    this.icon = this.input.querySelector(`.js-${this.blockName}__icon`);
    this.list = this.block.querySelector(`.js-${this.blockName}__list`);
    this.resetButton = this.list.querySelector(`.js-${this.blockName}__button_reset`);
    this.acceptButton = this.list.querySelector(`.js-${this.blockName}__button_accept`);
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
    this.input.addEventListener('mousedown', (event) => this._handleInputClick(event));
    this.input.addEventListener('focusin', () => this._handleInputFocus());
    this.handleOutsideClick = (event) => this._handleOutsideClick(event);

    if (this.resetButton) {
      this.resetButton.addEventListener('click', () => this._handleResetButtonClick());
    }
    if (this.acceptButton) {
      this.acceptButton.addEventListener('click', () => this._handleAcceptButtonClick());
    }
  }

  _handleInputClick(event) {
    const input = this.input.querySelector('input');
    if (document.activeElement === input) {
      this.state.active = !this.state.active;
      this._renderState();
    } else if (this.state.active) {
      event.preventDefault();
      this.state.active = false;
      this._renderState();
    }
  }

  _handleInputFocus() {
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
      const i = item.element;
      i.dataset.value = 0;
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
      this.input.classList.add(`${this.blockName}__input_active`);
      this.icon.classList.add(`${this.blockName}__icon_active`);
      this.list.classList.add(`${this.blockName}__list_active`);
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
      this.input.classList.remove(`${this.blockName}__input_active`);
      this.icon.classList.remove(`${this.blockName}__icon_active`);
      this.list.classList.remove(`${this.blockName}__list_active`);
    }
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
    const input = this.input.querySelector('input');
    input.value = this.state.totalValue.join(', ');
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  _toggleResetButton() {
    if (this.resetButton) {
      const input = this.input.querySelector('input');
      if (!input.value) {
        this.resetButton.classList.add(`${this.blockName}__button_inactive`);
      } else {
        this.resetButton.classList.remove(`${this.blockName}__button_inactive`);
      }
    }
  }
}

export default DropdownList;
