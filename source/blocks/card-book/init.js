import './card-book.scss';
import CardBook from './CardBook';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-card-book');
  blocks.forEach((block) => new CardBook(block));
}

export default renderBlocks();
