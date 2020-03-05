class Pagination {
  constructor(block) {
    this.block = block;
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.blockName = 'pagination';
    this.pageBtns = this.block.querySelectorAll(`.js-${this.blockName}__page`);
    this.dots = this.block.querySelectorAll(`.js-${this.blockName}__dots`);
    this.nextBtn = this.block.querySelector(`.js-${this.blockName}__button-next`);
    this.counter = this.block.querySelector(`.js-${this.blockName}__counter`);
    this.itemsNumber = this.block.dataset.itemsNumber;
    this.itemsPerPage = this.block.dataset.itemsPerPage;
    this.pagesNumber = Math.ceil(this.itemsNumber / this.itemsPerPage);
    this._displayPageButtons();
  }

  _displayPageButtons() {
    this.currentPage = 1;
    this.counter.textContent = `1 \u2013 ${this.itemsPerPage}`;
    this.pageBtns[0].classList.add(`${this.blockName}__page_current`);
    this._toggleNextButton();
    this._rearrangePageButtons();
  }

  _bindEventListeners() {
    this.pageBtns.forEach((pageBtn) => {
      pageBtn.addEventListener('click', (event) => this._handlePageButtonClick(event));
    });
    this.nextBtn.addEventListener('click', () => this._handleNextButtonClick());
  }

  _handlePageButtonClick(event) {
    const pageBtn = event.currentTarget;
    this._clearCurrentState();
    pageBtn.classList.add(`${this.blockName}__page_current`);
    this.currentPage = Array.from(this.pageBtns).indexOf(pageBtn) + 1;
    this._updateCounter();
    this._toggleNextButton();
    this._rearrangePageButtons();
  }

  _handleNextButtonClick() {
    const pageBtn = this.pageBtns[this.currentPage];
    if (this.currentPage < this.pagesNumber) {
      pageBtn.click();
    }
  }

  _clearCurrentState() {
    this.pageBtns.forEach((pageBtn) => {
      pageBtn.classList.remove(`${this.blockName}__page_current`);
    });
  }

  _updateCounter() {
    let counterLast = this.itemsPerPage * this.currentPage;
    counterLast = (counterLast > this.itemsNumber) ? this.itemsNumber : counterLast;
    this.counter.textContent = `${this.itemsPerPage * (this.currentPage - 1) + 1} \u2013 ${counterLast}`;
  }

  _toggleNextButton() {
    const nextBtn = this.nextBtn.querySelector('.button');
    if (this.currentPage < this.pagesNumber) {
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }
  }

  _rearrangePageButtons() {
    if (this.pagesNumber > 5) {
      switch (this.currentPage) {
        case 1:
        case 2:
          this._toggleDots({ onIndexes: [1], offIndexes: [0] });
          this._togglePageButtons(1, this.pagesNumber - 3, true);
          this._togglePageButtons(3, this.pagesNumber - 1, false);
          break;
        case this.pagesNumber:
        case this.pagesNumber - 1:
          this._toggleDots({ onIndexes: [0], offIndexes: [1] });
          this._togglePageButtons(3, this.pagesNumber - 1, true);
          this._togglePageButtons(1, this.pagesNumber - 3, false);
          break;
        default:
          if (this.currentPage === 3) {
            this._toggleDots({ onIndexes: [1], offIndexes: [0] });
          } else if (this.currentPage === this.pagesNumber - 2) {
            this._toggleDots({ onIndexes: [0], offIndexes: [1] });
          } else {
            this._toggleDots({ onIndexes: [0, 1] });
          }
          this._togglePageButtons(this.currentPage - 2, this.currentPage + 2, true);
          this._togglePageButtons(1, this.currentPage - 2, false);
          this._togglePageButtons(this.currentPage + 1, this.pagesNumber - 1, false);
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
        pageBtn.classList.remove(`${this.blockName}__page_hidden`);
      } else {
        pageBtn.classList.add(`${this.blockName}__page_hidden`);
      }
    });
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-pagination');
  blocks.forEach((block) => new Pagination(block));
}

export default renderBlocks();
