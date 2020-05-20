import ChartCircle from '../../blocks/chart-circle/chart-circle';
import RoomDetailsReviews from './room-details__reviews/room-details__reviews';

class RoomDetails {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
  }

  _initialize() {
    this.chart = new ChartCircle(this.block.querySelector('.js-chart-circle'));
    /*
    this.chart.updateChart({
      dataList: [
        { value: 130, title: 'asd' },
        { value: 65, title: 'zxc' },
        { value: 65, title: 'qwe' },
        { value: 65, title: 'rty' },
      ],
    });
    */

    this.reviews = new RoomDetailsReviews(this.block.querySelector(`.js-${this.blockName}__reviews`));
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-room-details');
  blocks.forEach((block) => new RoomDetails(block));
}

export default renderBlocks();
