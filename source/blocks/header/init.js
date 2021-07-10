import './header.scss';
import Header from './Header';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-header');
  blocks.forEach((block) => new Header(block));
}

export default renderBlocks();
