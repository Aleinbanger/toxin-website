import ChartCircle from '../../blocks/chart-circle/chart-circle';
import RoomDetailsReviews from './room-details__reviews/room-details__reviews';

class RoomDetails {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.images = this.block.querySelector(`.js-${this.blockName}__images`);
    this.chart = new ChartCircle(this.block.querySelector('.js-chart-circle'));
    this.reviews = new RoomDetailsReviews(this.block.querySelector(`.js-${this.blockName}__reviews`));
  }

  _bindEventListeners() {
    this.images.addEventListener('click', (event) => this._handleImageClick(event));
  }

  _handleImageClick(event) {
    const image = event.target;
    this.images.prepend(image);
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-room-details');
  blocks.forEach((block) => new RoomDetails(block));
}

export default renderBlocks();
