import './room-details.scss';
import RoomDetails from './RoomDetails';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-room-details');
  blocks.forEach((block) => new RoomDetails(block));
}

export default renderBlocks();
