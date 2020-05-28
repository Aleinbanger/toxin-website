import './card-book.scss';

import CardForm from '../../scripts/card-form';
import DropdownDate from '../dropdown-date/dropdown-date';

class CardBook extends CardForm {
  constructor(block) {
    super('card-book', block);
  }

  _initialize() {
    super._initialize();
    this.roomDaysCounter = this.block.querySelector(`.js-${this.blockName}__room-days`);
    this.state = {
      roomPrice: Number(this.block.dataset.roomPrice),
      discount: Number(this.block.dataset.discount),
      servicePrice: Number(this.block.dataset.servicePrice),
      addServicePrice: Number(this.block.dataset.addServicePrice),
    };
    this._renderPrices();
    this._renderDropdownDate();
    this._renderState();
  }

  _renderPrices() {
    this.block.querySelectorAll(`.js-${this.blockName}__room-price`).forEach((price) => {
      const p = price;
      p.textContent = `${this.state.roomPrice.toLocaleString('ru-RU')}\u20BD`;
    });
    this.block.querySelector(`.js-${this.blockName}__discount`)
      .textContent = `${this.state.discount.toLocaleString('ru-RU')}\u20BD`;
    this.block.querySelector(`.js-${this.blockName}__service-price`)
      .textContent = `${this.state.servicePrice.toLocaleString('ru-RU')}\u20BD`;
    this.block.querySelector(`.js-${this.blockName}__addservice-price`)
      .textContent = `${this.state.addServicePrice.toLocaleString('ru-RU')}\u20BD`;
  }

  _renderDropdownDate() {
    const dropdownDate = this.block.querySelector(`.js-${this.blockName}__dropdown-date`);
    this.dropdownDate = new DropdownDate(dropdownDate);
  }

  _bindEventListeners() {
    super._bindEventListeners();
    this.formItems.forEach((item) => {
      item.addEventListener('change', () => this._renderState());
    });
  }

  _renderState() {
    this._updateRoomDaysCounter();
    this._updateTotalPrices();
  }

  _updateRoomDaysCounter() {
    const [from, to] = this.dropdownDate.state.selectedDates;
    this.state.roomDays = Math.round((to - from) / (1000 * 3600 * 24));
    if (this.state.roomDays) {
      let daysPluralForm;
      switch (this.state.roomDays) {
        case 1:
          daysPluralForm = 'сутки';
          break;
        default:
          daysPluralForm = 'суток';
      }
      this.roomDaysCounter.textContent = `${this.state.roomDays} ${daysPluralForm}`;
    } else {
      this.roomDaysCounter.textContent = '0 суток';
    }
  }

  _updateTotalPrices() {
    if (!this.state.roomDays) {
      this.state.roomDays = 0;
    }
    this.state.totalRoomPrice = this.state.roomPrice * this.state.roomDays;
    this.state.totalPrice = this.state.totalRoomPrice + this.state.servicePrice
      + this.state.addServicePrice - this.state.discount;
    this.state.totalPrice = (this.state.totalPrice < 0) ? 0 : this.state.totalPrice;
    this.block.querySelector(`.js-${this.blockName}__room-price-total`)
      .textContent = `${this.state.totalRoomPrice.toLocaleString('ru-RU')}\u20BD`;
    this.block.querySelector(`.js-${this.blockName}__total-price`)
      .textContent = `${this.state.totalPrice.toLocaleString('ru-RU')}\u20BD`;
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-card-book');
  blocks.forEach((block) => new CardBook(block));
}

export default renderBlocks();
