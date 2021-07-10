import ChartCircle from 'blocks/chart-circle/ChartCircle';

import RoomDetailsReviews from './room-details__reviews/RoomDetailsReviews';

class RoomDetails {
  constructor(block) {
    this.blockName = 'room-details';
    this.block = block;
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.images = this.block.querySelector(`.js-${this.blockName}__images`);

    const chart = this.block.querySelector(`.js-${this.blockName}__chart`);
    this.chart = new ChartCircle(chart);

    const reviews = this.block.querySelector(`.js-${this.blockName}__reviews`);
    this.reviews = new RoomDetailsReviews(reviews);
  }

  _bindEventListeners() {
    this.images.addEventListener('click', (event) => this._handleImageClick(event));
  }

  _handleImageClick(event) {
    const image = event.target;
    this.images.prepend(image);
  }
}

export default RoomDetails;
