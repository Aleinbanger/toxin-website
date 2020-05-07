import Carousel from '../carousel/carousel';
import Rating from '../rating/rating';

class CardRoom {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
  }

  updateState() {
    this._initialize();
  }

  _initialize() {
    this.state = {
      roomNumber: Number(this.block.dataset.roomNumber),
      roomLuxury: String(this.block.dataset.roomLuxury),
      roomPrice: Number(this.block.dataset.roomPrice),
      roomRating: Number(this.block.dataset.roomRating),
      roomReviews: Number(this.block.dataset.roomReviews),
    };
    this._renderState();
  }

  _renderState() {
    this.block.querySelector(`.js-${this.blockName}__room-number`)
      .textContent = this.state.roomNumber;

    const roomType = this.block.querySelector(`.js-${this.blockName}__room-type`);
    if (this.state.roomLuxury === 'true') {
      roomType.textContent = 'Люкс';
    } else if (this.state.roomLuxury === 'false') {
      roomType.textContent = '';
    }

    this.block.querySelector(`.js-${this.blockName}__room-price`)
      .textContent = `${this.state.roomPrice.toLocaleString('ru-RU')}\u20BD`;

    const rating = this.block.querySelector('.js-rating');
    rating.title = this.state.roomRating;
    this.rating = new Rating(rating);

    this.block.querySelector(`.js-${this.blockName}__room-reviews`)
      .textContent = this.state.roomReviews;

    this.carousel = new Carousel(this.block.querySelector('.js-carousel'));
  }
}

export default CardRoom;
