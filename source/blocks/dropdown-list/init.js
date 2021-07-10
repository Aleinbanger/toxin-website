import './dropdown-list.scss';
import DropdownList from './DropdownList';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-dropdown-list');
  blocks.forEach((block) => new DropdownList(block));
}

export default renderBlocks();
