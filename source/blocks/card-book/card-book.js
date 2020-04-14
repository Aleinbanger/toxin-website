import CardForm from '../../scripts/card-form';

class CardBook extends CardForm {
  _initialize() {
    this.form = this.block.querySelector(`.js-${this.blockName}__form`);
    this.formItems = this.form.querySelectorAll(`.js-${this.blockName}__form-item`);
    this.roomDaysCounter = this.block.querySelector(`.js-${this.blockName}__room-days`);
    this.state = {
      roomNumber: Number(this.block.dataset.roomNumber),
      roomPrice: Number(this.block.dataset.roomPrice),
      discount: Number(this.block.dataset.discount),
      servicePrice: Number(this.block.dataset.servicePrice),
      addServicePrice: Number(this.block.dataset.addServicePrice),
    };
    this._renderPrices();
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

  _bindEventListeners() {
    this.form.addEventListener('submit', (event) => this._validateForm(event));
    this.formItems.forEach((item) => {
      item.addEventListener('change', () => this._renderState());
    });
  }

  _renderState() {
    this._updateRoomDaysCounter();
    this._updateTotalPrices();
  }

  _updateRoomDaysCounter() {
    const from = this.block.querySelector('.js-dropdown-date__input input').value
      .split('.').map((x) => Number(x));
    const to = this.block.querySelector('.js-dropdown-date__input-sec input').value
      .split('.').map((x) => Number(x));
    const diff = new Date(to[2], to[1] - 1, to[0]) - new Date(from[2], from[1] - 1, from[0]);
    this.state.roomDays = Math.round(diff / (1000 * 3600 * 24));
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
