import './cards.scss';
import Cards from './Cards';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-cards');
  blocks.forEach((block) => new Cards(block));
}

export default renderBlocks();
