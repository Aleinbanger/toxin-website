import './form-elements.scss';
import FormElements from './FormElements';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-form-elements');
  blocks.forEach((block) => new FormElements(block));
}

export default renderBlocks();
