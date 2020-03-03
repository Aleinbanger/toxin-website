class Pagination {
  constructor(element) {
    this.element = element;
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.blockName = 'pagination';
    this.pageBtns = this.element.querySelectorAll(`.js-${this.blockName}__page`);
    this.dots = this.element.querySelectorAll(`.js-${this.blockName}__dots`);
    this.nextBtn = this.element.querySelector(`.js-${this.blockName}__button-next`);
    this.counter = this.element.querySelector(`.js-${this.blockName}__counter`);
    this.itemsNumber = this.element.dataset.itemsNumber;
    this.itemsPerPage = this.element.dataset.itemsPerPage;
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
    this.nextBtn
      .addEventListener('click', () => this._handleNextButtonClick());
  }

  _handlePageButtonClick(event) {
    const pageBtn = event.currentTarget;
    this._removeCurrentClass();
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

  _removeCurrentClass() {
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
          this.dots[1].classList.add(`${this.blockName}__dots_active`);
          this.dots[0].classList.remove(`${this.blockName}__dots_active`);
          this._togglePageButtons(1, this.pagesNumber - 3, 'inline-flex');
          this._togglePageButtons(3, this.pagesNumber - 1, 'none');
          break;
        case this.pagesNumber:
        case this.pagesNumber - 1:
          this.dots[0].classList.add(`${this.blockName}__dots_active`);
          this.dots[1].classList.remove(`${this.blockName}__dots_active`);
          this._togglePageButtons(3, this.pagesNumber - 1, 'inline-flex');
          this._togglePageButtons(1, this.pagesNumber - 3, 'none');
          break;
        default:
          if (this.currentPage === 3) {
            this.dots[1].classList.add(`${this.blockName}__dots_active`);
            this.dots[0].classList.remove(`${this.blockName}__dots_active`);
          } else if (this.currentPage === this.pagesNumber - 2) {
            this.dots[0].classList.add(`${this.blockName}__dots_active`);
            this.dots[1].classList.remove(`${this.blockName}__dots_active`);
          } else {
            this.dots.forEach((dots) => dots.classList.add(`${this.blockName}__dots_active`));
          }
          this._togglePageButtons(this.currentPage - 2, this.currentPage + 2, 'inline-flex');
          this._togglePageButtons(1, this.currentPage - 2, 'none');
          this._togglePageButtons(this.currentPage + 1, this.pagesNumber - 1, 'none');
      }
    }
  }

  _togglePageButtons(first, last, display) {
    Array.from(this.pageBtns).slice(first, last).forEach((pageBtn) => {
      const tmp = pageBtn;
      tmp.style.display = display;
    });
  }
}

function renderElements() {
  const elements = document.querySelectorAll('.js-pagination');
  elements.forEach((element) => new Pagination(element));
}

export default renderElements();
