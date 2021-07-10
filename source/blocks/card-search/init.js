import './card-search.scss';
import CardSearch from './CardSearch';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-card-search');
  blocks.forEach((block) => new CardSearch(block));
}

export default renderBlocks();
