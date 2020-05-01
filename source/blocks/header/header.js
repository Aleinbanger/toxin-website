import HeaderDropdown from './header__dropdown';

class Header {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.navbarBtn = this.block.querySelector(`.js-${this.blockName}__navbar-button`);
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
    this.navbarBtn.addEventListener('click', () => this._handleNavbarBtnClick());
  }

  _handleNavbarBtnClick() {
    this.state.navbarActive = !this.state.navbarActive;
    this._renderState();
  }

  _renderState() {
    if (this.state.navbarActive) {
      this.navbar.classList.add(`${this.blockName}__navbar_active`);
      this.navbarBtn.classList.add(`${this.blockName}__navbar-button_active`);
    } else {
      this.navbar.classList.remove(`${this.blockName}__navbar_active`);
      this.navbarBtn.classList.remove(`${this.blockName}__navbar-button_active`);
    }
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-header');
  blocks.forEach((block) => new Header(block));
}

export default renderBlocks();
