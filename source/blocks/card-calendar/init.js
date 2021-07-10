import './card-calendar.scss';
import CardCalendar from './CardCalendar';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-card-calendar');
  blocks.forEach((block) => new CardCalendar(block));
}

export default renderBlocks();
