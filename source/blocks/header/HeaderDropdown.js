class HeaderDropdown {
  constructor(element) {
    this.elementName = 'header__dropdown';
    this.element = element;
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.title = this.element.querySelector(`.js-${this.elementName}-title`);
    this.icon = this.title.querySelector(`.js-${this.elementName}-icon`);
    this.list = this.element.querySelector(`.js-${this.elementName}-list`);
    this.state = {
      active: false,
    };
  }

  _bindEventListeners() {
    this.title.addEventListener('mousedown', (event) => this._handleTitleClick(event));
    this.title.addEventListener('focusin', () => this._handleTitleFocus());
    this.handleOutsideClick = (event) => this._handleOutsideClick(event);
  }

  _handleTitleClick(event) {
    if (document.activeElement === this.title) {
      this.state.active = !this.state.active;
      this._renderState();
    } else if (this.state.active) {
      event.preventDefault();
      this.state.active = false;
      this._renderState();
    }
  }

  _handleTitleFocus() {
    if (!this.state.active) {
      this.state.active = true;
      this._renderState();
    }
  }

  _handleOutsideClick(event) {
    const isClickInside = this.element.contains(event.target);
    if (!isClickInside && this.state.active) {
      this.state.active = false;
      this._renderState();
    }
  }

  _renderState() {
    if (this.state.active) {
      document.addEventListener('click', this.handleOutsideClick);
      this.icon.classList.add(`${this.elementName}-icon_active`);
      this.list.classList.add(`${this.elementName}-list_active`);
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
      this.icon.classList.remove(`${this.elementName}-icon_active`);
      this.list.classList.remove(`${this.elementName}-list_active`);
    }
  }
}

export default HeaderDropdown;
