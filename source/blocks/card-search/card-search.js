import CardForm from '../../scripts/card-form';
import '../dropdown-date/dropdown-date';
import '../dropdown-list/dropdown-list';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-card-search');
  blocks.forEach((block) => new CardForm(block));
}

export default renderBlocks();
