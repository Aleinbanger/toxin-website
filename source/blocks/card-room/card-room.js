import './card-room.scss';

import Rating from '../rating/rating';
import Carousel from '../carousel/carousel';

class CardRoom {
  constructor(wrapper) {
    this.blockName = 'card-room';
    this.block = wrapper.querySelector(`.js-${this.blockName}`);
    this._initialize();
  }

  updateState(room, roomImgSrcList) {
    this.link.setAttribute('href', room.href);
    Object.keys(room).forEach((key) => {
      if (key !== 'href' && key !== 'imgSrcList') {
        this.block.setAttribute(`data-room-${key}`, room[key]);
      }
    });
    this._setState();
    this._renderState();
    if (roomImgSrcList) {
      this.carousel.populateCarousel(roomImgSrcList);
    }
  }

  _initialize() {
    this.link = this.block.querySelector(`.js-${this.blockName}__info`);
    this.roomNumber = this.block.querySelector(`.js-${this.blockName}__room-number`);
    this.roomType = this.block.querySelector(`.js-${this.blockName}__room-type`);
    this.roomPrice = this.block.querySelector(`.js-${this.blockName}__room-price`);
    this.roomReviews = this.block.querySelector(`.js-${this.blockName}__room-reviews`);
    this._renderRating();
    this._renderCarousel();
    this._setState();
    this._renderState();
  }

  _renderRating() {
    const rating = this.block.querySelector(`.js-${this.blockName}__room-rating`);
    this.rating = new Rating(rating);
  }

  _renderCarousel() {
    const carousel = this.block.querySelector(`.js-${this.blockName}__carousel`);
    this.carousel = new Carousel(carousel);
  }

  _setState() {
    this.state = {
      roomNumber: Number(this.block.dataset.roomNumber),
      roomLuxury: String(this.block.dataset.roomLuxury),
      roomPrice: Number(this.block.dataset.roomPrice),
      roomReviews: Number(this.block.dataset.roomReviews),
      roomRating: Number(this.block.dataset.roomRating),
    };
  }

  _renderState() {
    this.roomNumber.textContent = this.state.roomNumber;
    if (this.state.roomLuxury === 'true') {
      this.roomType.textContent = 'Люкс';
    } else if (this.state.roomLuxury === 'false') {
      this.roomType.textContent = '';
    }
    this.roomPrice.textContent = `${this.state.roomPrice.toLocaleString('ru-RU')}\u20BD`;
    this.roomReviews.textContent = this.state.roomReviews;
    this.rating.updateState({ value: this.state.roomRating });
  }
}

export default CardRoom;
