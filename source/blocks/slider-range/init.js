import './slider-range.scss';
import SliderRange from './SliderRange';

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-slider-range');
  blocks.forEach((block) => new SliderRange(block));
}

export default renderBlocks();
