import './list-checkbox.scss';
import ListCheckbox from './ListCheckbox';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-list-checkbox');
  blocks.forEach((block) => new ListCheckbox(block));
}

export default renderBlocks();
