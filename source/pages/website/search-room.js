import SearchRoomResults from './search-room__results/search-room__results';

class SearchRoom {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
  }

  _initialize() {
    const results = this.block.querySelector(`.js-${this.blockName}__results`);
    this.results = new SearchRoomResults(results);
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-search-room');
  blocks.forEach((block) => new SearchRoom(block));
}

export default renderBlocks();
