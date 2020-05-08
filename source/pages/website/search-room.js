import SearchRoomResults from './search-room__results/search-room__results';

class SearchRoom {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.filterBtn = this.block.querySelector(`.js-${this.blockName}__filter-button`);
    this.filter = this.block.querySelector(`.js-${this.blockName}__filter`);
    this.state = {
      filterActive: false,
    };
    this._renderResults();
    this._renderState();
  }

  _renderResults() {
    const results = this.block.querySelector(`.js-${this.blockName}__results`);
    this.results = new SearchRoomResults(results);
  }

  _bindEventListeners() {
    this.filterBtn.addEventListener('click', () => this._handleFilterBtnClick());
  }

  _handleFilterBtnClick() {
    this.state.filterActive = !this.state.filterActive;
    this._renderState();
  }

  _renderState() {
    if (this.state.filterActive) {
      this.filter.classList.add(`${this.blockName}__filter_active`);
      this.filterBtn.classList.add(`${this.blockName}__filter-button_active`);
    } else {
      this.filter.classList.remove(`${this.blockName}__filter_active`);
      this.filterBtn.classList.remove(`${this.blockName}__filter-button_active`);
    }
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-search-room');
  blocks.forEach((block) => new SearchRoom(block));
}

export default renderBlocks();
