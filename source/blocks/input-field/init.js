import './input-field.scss';
import InputField from './InputField';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-input-field');
  blocks.forEach((block) => new InputField(block));
}

export default renderBlocks();
