import HeaderDropdown from './HeaderDropdown';

class Header {
  constructor(block) {
    this.blockName = 'header';
    this.block = block;
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.navbarButton = this.block.querySelector(`.js-${this.blockName}__navbar-button`);
    this.navbar = this.block.querySelector(`.js-${this.blockName}__navbar`);
    this.state = {
      navbarActive: false,
    };
    this._renderDropdowns();
    this._renderState();
  }

  _renderDropdowns() {
    this.dropdowns = [];
    const dropdowns = this.block.querySelectorAll(`.js-${this.blockName}__dropdown`);
    dropdowns.forEach((dropdown) => this.dropdowns.push(new HeaderDropdown(dropdown)));
  }

  _bindEventListeners() {
    this.navbarButton.addEventListener('click', () => this._handleNavbarButtonClick());
  }

  _handleNavbarButtonClick() {
    this.state.navbarActive = !this.state.navbarActive;
    this._renderState();
  }

  _renderState() {
    if (this.state.navbarActive) {
      this.navbar.classList.add(`${this.blockName}__navbar_active`);
      this.navbarButton.classList.add(`${this.blockName}__navbar-button_active`);
    } else {
      this.navbar.classList.remove(`${this.blockName}__navbar_active`);
      this.navbarButton.classList.remove(`${this.blockName}__navbar-button_active`);
    }
  }
}

export default Header;
