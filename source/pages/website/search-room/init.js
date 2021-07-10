import './search-room.scss';
import SearchRoom from './SearchRoom';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-search-room');
  blocks.forEach((block) => new SearchRoom(block));
}

export default renderBlocks();
