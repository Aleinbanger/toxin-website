import './card-signup.scss';
import CardSignup from './CardSignup';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-card-signup');
  blocks.forEach((block) => new CardSignup(block));
}

export default renderBlocks();
