class Carousel {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.images = this.block.querySelectorAll(`.js-${this.blockName}__image`);
    this.prevBtn = this.block.querySelector(`.js-${this.blockName}__button_prev`);
    this.nextBtn = this.block.querySelector(`.js-${this.blockName}__button_next`);
    this.indicators = this.block.querySelectorAll(`.js-${this.blockName}__indicator`);
    this.state = {
      imagesNumber: this.images.length,
      currentImage: 1,
      prevImage: this.images.length,
      nextImage: 2,
    };
    this._renderState();
  }

  _bindEventListeners() {
    this.prevBtn.addEventListener('click', () => this._handlePrevButtonClick());
    this.nextBtn.addEventListener('click', () => this._handleNextButtonClick());
    this.indicators.forEach((indicator) => {
      indicator.addEventListener('click', (event) => this._handleIndicatorClick(event));
    });
  }

  _handlePrevButtonClick() {
    this.state.currentImage = (this.state.currentImage === 1)
      ? this.state.currentImage = this.state.imagesNumber
      : this.state.currentImage -= 1;
    this._updatePrevAndNext();
    this._renderState();
  }

  _handleNextButtonClick() {
    this.state.currentImage = (this.state.currentImage === this.images.length)
      ? 1
      : this.state.currentImage + 1;
    this._updatePrevAndNext();
    this._renderState();
  }

  _handleIndicatorClick(event) {
    this.state.currentImage = Array.from(this.indicators).indexOf(event.currentTarget) + 1;
    this._updatePrevAndNext();
    this._renderState();
  }

  _updatePrevAndNext() {
    this.state.prevImage = this.state.currentImage - 1;
    if (this.state.prevImage < 1) {
      this.state.prevImage = this.state.imagesNumber;
    }
    this.state.nextImage = this.state.currentImage + 1;
    if (this.state.nextImage > this.state.imagesNumber) {
      this.state.nextImage = 1;
    }
  }

  _renderState() {
    this.images.forEach((image) => {
      image.classList.remove(`${this.blockName}__image_active`);
      image.classList.remove(`${this.blockName}__image_prev`);
      image.classList.remove(`${this.blockName}__image_next`);
    });
    this.images[this.state.currentImage - 1].classList.add(`${this.blockName}__image_active`);
    this.images[this.state.prevImage - 1].classList.add(`${this.blockName}__image_prev`);
    this.images[this.state.nextImage - 1].classList.add(`${this.blockName}__image_next`);

    this.indicators.forEach((indicator) => {
      indicator.classList.remove(`${this.blockName}__indicator_active`);
    });
    this.indicators[this.state.currentImage - 1].classList.add(`${this.blockName}__indicator_active`);
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-carousel');
  blocks.forEach((block) => new Carousel(block));
}

export default renderBlocks();
