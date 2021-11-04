class Carousel {
  constructor(wrapper) {
    this.blockName = 'carousel';
    this.block = wrapper.querySelector(`.js-${this.blockName}`);
    this._initialize();
    this._bindEventListeners();
  }

  populateCarousel(imgSrcList) {
    imgSrcList.forEach((imgSrc, index) => {
      const $image = $('<img>', {
        class: `${this.blockName}__image js-${this.blockName}__image`,
        src: imgSrc,
        alt: `Image ${index + 1}`,
      });
      const $indicator = $('<span>', {
        class: `${this.blockName}__indicator js-${this.blockName}__indicator`,
        'data-image': index + 1,
      });
      $image.appendTo(this.imagesContainer);
      $indicator.appendTo(this.indicatorsContainer);
    });
    this._initialize();
  }

  _initialize() {
    this.imagesContainer = this.block.querySelector(`.js-${this.blockName}__images`);
    this.images = this.block.querySelectorAll(`.js-${this.blockName}__image`);
    this.prevButton = this.block.querySelector(`.js-${this.blockName}__button_prev`);
    this.nextButton = this.block.querySelector(`.js-${this.blockName}__button_next`);
    this.indicatorsContainer = this.block.querySelector(`.js-${this.blockName}__indicators`);
    this.indicators = this.block.querySelectorAll(`.js-${this.blockName}__indicator`);
    this.state = {
      imagesNumber: this.images.length,
      currentImage: 1,
      prevImage: this.images.length,
      nextImage: 2,
    };
    this._activateCarousel();
  }

  _activateCarousel() {
    switch (this.state.imagesNumber) {
      case 0:
        this._disableButtons();
        break;
      case 1:
        this.images[this.state.currentImage - 1].classList.add(`${this.blockName}__image_active`);
        this.indicators[0].classList.add(`${this.blockName}__indicator_hidden`);
        this._disableButtons();
        break;
      default:
        this.indicators[0].classList.remove(`${this.blockName}__indicator_hidden`);
        this._enableButtons();
        this._renderState();
    }
  }

  _disableButtons() {
    this.prevButton.classList.add(`${this.blockName}__button_hidden`);
    this.nextButton.classList.add(`${this.blockName}__button_hidden`);
  }

  _enableButtons() {
    this.prevButton.classList.remove(`${this.blockName}__button_hidden`);
    this.nextButton.classList.remove(`${this.blockName}__button_hidden`);
  }

  _bindEventListeners() {
    this.prevButton.addEventListener('click', () => this._handlePrevButtonClick());
    this.nextButton.addEventListener('click', () => this._handleNextButtonClick());
    this.indicatorsContainer.addEventListener('click', (event) => this._handleIndicatorClick(event));
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
    if (Array.from(this.indicators).includes(event.target)) {
      this.state.currentImage = Number(event.target.dataset.image);
      this._updatePrevAndNext();
      this._renderState();
    }
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

export default Carousel;
