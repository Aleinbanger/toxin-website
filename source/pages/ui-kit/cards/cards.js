import './cards.scss';

import CardRoom from 'blocks/card-room/CardRoom';

class Cards {
  constructor(block) {
    this.blockName = 'cards';
    this.block = block;
    this._initialize();
  }

  _initialize() {
    this.block.querySelectorAll(`.js-${this.blockName}__card-room`)
      .forEach((cardRoom) => new CardRoom(cardRoom));
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-cards');
  blocks.forEach((block) => new Cards(block));
}

export default renderBlocks();
