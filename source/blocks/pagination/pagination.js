class Pagination {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.pageBtns = this.block.querySelectorAll(`.js-${this.blockName}__page`);
    this.dots = this.block.querySelectorAll(`.js-${this.blockName}__dots`);
    this.nextBtn = this.block.querySelector(`.js-${this.blockName}__button-next`);
    this.counter = this.block.querySelector(`.js-${this.blockName}__counter`);
    this.state = {
      currentPage: 1,
      itemsNumber: Number(this.block.dataset.itemsNumber),
      itemsPerPage: Number(this.block.dataset.itemsPerPage),
    };
    this.state.pagesNumber = Math.ceil(this.state.itemsNumber / this.state.itemsPerPage);
    this._renderState();
  }

  _bindEventListeners() {
    this.pageBtns.forEach((pageBtn) => {
      pageBtn.addEventListener('click', (event) => this._handlePageButtonClick(event));
    });
    this.nextBtn.addEventListener('click', () => this._handleNextButtonClick());
  }

  _handlePageButtonClick(event) {
    this.state.currentPage = Array.from(this.pageBtns).indexOf(event.currentTarget) + 1;
    this._renderState();
  }

  _handleNextButtonClick() {
    if (this.state.currentPage < this.state.pagesNumber) {
      this.pageBtns[this.state.currentPage].click();
    }
  }

  _renderState() {
    this.pageBtns.forEach((pageBtn) => {
      pageBtn.classList.remove(`${this.blockName}__page_current`);
    });
    this.pageBtns[this.state.currentPage - 1].classList.add(`${this.blockName}__page_current`);
    this._updateCounter();
    this._toggleNextButton();
    this._rearrangePageButtons();
  }

  _updateCounter() {
    let counterLast = this.state.itemsPerPage * this.state.currentPage;
    counterLast = (counterLast > this.state.itemsNumber) ? this.state.itemsNumber : counterLast;
    this.counter.textContent = `${this.state.itemsPerPage * (this.state.currentPage - 1) + 1} \u2013 ${counterLast}`;
  }

  _toggleNextButton() {
    const nextBtn = this.nextBtn.querySelector('button');
    if (this.state.currentPage < this.state.pagesNumber) {
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }
  }

  _rearrangePageButtons() {
    if (this.state.pagesNumber > 5) {
      switch (this.state.currentPage) {
        case 1:
        case 2:
          this._toggleDots({ onIndexes: [1], offIndexes: [0] });
          this._togglePageButtons(1, this.state.pagesNumber - 3, true);
          this._togglePageButtons(3, this.state.pagesNumber - 1, false);
          break;
        case this.state.pagesNumber:
        case this.state.pagesNumber - 1:
          this._toggleDots({ onIndexes: [0], offIndexes: [1] });
          this._togglePageButtons(3, this.state.pagesNumber - 1, true);
          this._togglePageButtons(1, this.state.pagesNumber - 3, false);
          break;
        default:
          if (this.state.currentPage === 3) {
            this._toggleDots({ onIndexes: [1], offIndexes: [0] });
          } else if (this.state.currentPage === this.state.pagesNumber - 2) {
            this._toggleDots({ onIndexes: [0], offIndexes: [1] });
          } else {
            this._toggleDots({ onIndexes: [0, 1] });
          }
          this._togglePageButtons(this.state.currentPage - 2, this.state.currentPage + 2, true);
          this._togglePageButtons(1, this.state.currentPage - 2, false);
          this._togglePageButtons(this.state.currentPage + 1, this.state.pagesNumber - 1, false);
      }
    }
  }

  _toggleDots({ onIndexes, offIndexes }) {
    if (onIndexes) {
      onIndexes.forEach((onIndex) => this.dots[onIndex].classList.add(`${this.blockName}__dots_active`));
    }
    if (offIndexes) {
      offIndexes.forEach((offIndex) => this.dots[offIndex].classList.remove(`${this.blockName}__dots_active`));
    }
  }

  _togglePageButtons(first, last, display) {
    Array.from(this.pageBtns).slice(first, last).forEach((pageBtn) => {
      if (display) {
        pageBtn.classList.remove(`${this.blockName}__page_inactive`);
      } else {
        pageBtn.classList.add(`${this.blockName}__page_inactive`);
      }
    });
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-pagination');
  blocks.forEach((block) => new Pagination(block));
}

export default renderBlocks();
