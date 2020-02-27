class Rating {
  constructor(element) {
    this.element = element;
    this._initialize();
  }

  _initialize() {
    this.blockName = 'rating';
    this.value = Number(this.element.title);
    this._displayRating();
  }

  _displayRating() {
    const icons = this.element.querySelectorAll(`.${this.blockName}__icon`);
    let j = this.value;
    icons.forEach((icon) => {
      const i = icon;
      i.textContent = (j > 0) ? 'star' : 'star_border';
      j -= 1;
    });
  }
}

function renderElements() {
  const elements = document.querySelectorAll('.js-rating');
  elements.forEach((element) => new Rating(element));
}

export default renderElements();
