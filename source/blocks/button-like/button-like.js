class ButtonLike {
  constructor(element) {
    this._element = element;
    this._attachEventHandlers();
  }

  _attachEventHandlers() {
    this._element
      .addEventListener('click', () => this._handleButtonClick());
  }

  _handleButtonClick() {
    const btn = this._element;
    const counter = btn.querySelector('.button-like__counter');
    const icon = btn.querySelector('.button-like__icon');
    if (btn.classList.contains('button-like_active')) {
      counter.textContent = Number(counter.textContent) - 1;
      icon.textContent = 'favorite_border';
    } else {
      counter.textContent = Number(counter.textContent) + 1;
      icon.textContent = 'favorite';
    }
    btn.classList.toggle('button-like_active');
  }
}

function renderElements() {
  const buttons = document.querySelectorAll('.button-like');
  buttons.forEach((button) => new ButtonLike(button));
}

export default renderElements();
