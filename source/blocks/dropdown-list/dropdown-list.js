import DropdownListItem from './dropdown-list__item';

class DropdownList {
  constructor(block) {
    this.block = block;
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.blockName = 'dropdown-list';
    this.input = this.block.querySelector(`.js-${this.blockName}__input`);
    this.icon = this.input.querySelector(`.js-${this.blockName}__icon`);
    this.list = this.block.querySelector(`.js-${this.blockName}__list`);
    this.resetBtn = this.list.querySelector(`.js-${this.blockName}__btn_reset`);
    this.acceptBtn = this.list.querySelector(`.js-${this.blockName}__btn_accept`);
    this._renderListItems();
    this._getTotalValue();
    this._toggleResetButton();
  }

  _renderListItems() {
    this.items = [];
    const items = this.list.querySelectorAll(`.js-${this.blockName}__item`);
    items.forEach((item) => this.items.push(new DropdownListItem(item)));
  }

  _bindEventListeners() {
    this.input.addEventListener('click', () => this._handleInputClick());
    document.addEventListener('click', (event) => this._handleOutsideClick(event));
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this._handleResetButtonClick());
    }
    if (this.acceptBtn) {
      this.acceptBtn.addEventListener('click', () => this._handleAcceptButtonClick());
    }
  }

  _handleInputClick() {
    this.input.classList.toggle(`${this.blockName}__input_active`);
    this.icon.classList.toggle(`${this.blockName}__icon_active`);
    this.list.classList.toggle(`${this.blockName}__list_active`);
    this._getTotalValue();
    this._toggleResetButton();
  }

  _handleOutsideClick(event) {
    const isClickInside = this.block.contains(event.target);
    if (!isClickInside) {
      this._closeDropdown();
      this._getTotalValue();
      this._toggleResetButton();
    }
  }

  _handleResetButtonClick() {
    const items = this.list.querySelectorAll(`.js-${this.blockName}__item`);
    items.forEach((item) => {
      const i = item;
      i.dataset.value = 0;
    });
    this._renderListItems();
    this._getTotalValue();
    this._toggleResetButton();
  }

  _handleAcceptButtonClick() {
    this._getTotalValue();
    this._toggleResetButton();
  }

  _closeDropdown() {
    this.input.classList.remove(`${this.blockName}__input_active`);
    this.icon.classList.remove(`${this.blockName}__icon_active`);
    this.list.classList.remove(`${this.blockName}__list_active`);
  }

  _getTotalValue() {
    this.totalValue = [];
    const combinedItems = this.items.filter((item) => item.combined === true);
    if (combinedItems.length !== 0) {
      const combinedItem = new DropdownListItem(combinedItems[0].element.cloneNode(true));
      combinedItems.slice(1).forEach((item) => {
        combinedItem.value += item.value;
        combinedItem.names = item.names;
      });
      combinedItem.updateListItemName(combinedItem);
      if (combinedItem.value !== 0) {
        this.totalValue.push(`${combinedItem.value} ${combinedItem.name}`);
      }
    }
    this.items.forEach((item) => {
      if (!item.combined && item.value !== 0) {
        this.totalValue.push(`${item.value} ${item.name}`);
      }
    });
    const input = this.input.querySelector('input');
    input.value = this.totalValue.join(', ');
  }

  _toggleResetButton() {
    if (this.resetBtn) {
      const input = this.input.querySelector('input');
      if (input.value === '') {
        this.resetBtn.classList.add(`${this.blockName}__btn_inactive`);
      } else {
        this.resetBtn.classList.remove(`${this.blockName}__btn_inactive`);
      }
    }
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-dropdown-list');
  blocks.forEach((block) => new DropdownList(block));
}

export default renderBlocks();
