import CardForm from '../../scripts/card-form';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-card-search');
  blocks.forEach((block) => new CardForm(block));
}

export default renderBlocks();
