class Pagination {
  constructor(wrapper) {
    this.blockName = 'pagination';
    this.block = wrapper.querySelector(`.js-${this.blockName}`);
    this._initialize();
    this._bindEventListeners();
  }

  populatePagination({ itemsNumber, itemsPerPage }) {
    this.block.dataset.itemsNumber = itemsNumber;
    this.block.dataset.itemsPerPage = itemsPerPage;
    this.pageBtnsContainer.innerHTML = '';
    const pagesNumber = Math.ceil(itemsNumber / itemsPerPage);
    for (let i = 1; i <= pagesNumber; i += 1) {
      const $pageBtn = $('<button>', {
        class: `${this.blockName}__button-page js-${this.blockName}__button-page`,
        'data-page': i,
        text: i,
      });
      $pageBtn.appendTo(this.pageBtnsContainer);
      if (i === 1 || i === pagesNumber - 1) {
        const $dots = $('<i>', {
          class: `${this.blockName}__dots js-${this.blockName}__dots`,
          text: '...',
        });
        $dots.appendTo(this.pageBtnsContainer);
      }
    }
    this._initialize();
  }

  _initialize() {
    this.pageBtnsContainer = this.block.querySelector(`.js-${this.blockName}__buttons-pages`);
    this.pageBtns = this.block.querySelectorAll(`.js-${this.blockName}__button-page`);
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
    this.pageBtnsContainer.addEventListener('click', (event) => this._handlePageButtonClick(event));
    this.nextBtn.addEventListener('click', () => this._handleNextButtonClick());
  }

  _handlePageButtonClick(event) {
    if (Array.from(this.pageBtns).includes(event.target)) {
      this.state.currentPage = Number(event.target.dataset.page);
      this.block.dispatchEvent(new Event('change', { bubbles: true }));
      this._renderState();
    }
  }

  _handleNextButtonClick() {
    if (this.state.currentPage < this.state.pagesNumber) {
      this.pageBtns[this.state.currentPage].click();
    }
  }

  _renderState() {
    this.pageBtns.forEach((pageBtn) => {
      pageBtn.classList.remove(`${this.blockName}__button-page_current`);
    });
    this.pageBtns[this.state.currentPage - 1].classList.add(`${this.blockName}__button-page_current`);
    this._updateCounter();
    this._toggleNextButton();
    this._rearrangePageButtons();
  }

  _updateCounter() {
    const lastItem = this.state.itemsPerPage * this.state.currentPage;
    const counterLastNumber = lastItem > this.state.itemsNumber
      ? this.state.itemsNumber : lastItem;
    const counterText = this.state.itemsNumber > 100
      ? 'из 100+' : `из ${this.state.itemsNumber}`;
    this.counter.textContent = `${this.state.itemsPerPage * (this.state.currentPage - 1) + 1} \u2013 ${counterLastNumber} ${counterText}`;
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
          switch (this.state.currentPage) {
            case 3:
              this._toggleDots({ onIndexes: [1], offIndexes: [0] });
              break;
            case this.state.pagesNumber - 2:
              this._toggleDots({ onIndexes: [0], offIndexes: [1] });
              break;
            default:
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
        pageBtn.classList.remove(`${this.blockName}__button-page_inactive`);
      } else {
        pageBtn.classList.add(`${this.blockName}__button-page_inactive`);
      }
    });
  }
}

export default Pagination;
