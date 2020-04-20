import '../carousel/carousel';
import { Rating } from '../rating/rating';

class CardRoom {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
  }

  _initialize() {
    this.state = {
      roomPrice: Number(this.block.dataset.roomPrice),
      roomRating: Number(this.block.dataset.roomRating),
      roomReviews: Number(this.block.dataset.roomReviews),
    };
    this._renderState();
  }

  _renderState() {
    this.block.querySelector(`.js-${this.blockName}__room-price`)
      .textContent = `${this.state.roomPrice.toLocaleString('ru-RU')}\u20BD`;

    this.block.querySelector(`.js-${this.blockName}__room-reviews`)
      .textContent = this.state.roomReviews;

    const rating = this.block.querySelector('.js-rating');
    rating.title = this.state.roomRating;
    this.rating = new Rating(rating);
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-card-room');
  blocks.forEach((block) => new CardRoom(block));
}

export default renderBlocks();
