import './card-search.scss';

import CardForm from '../../scripts/card-form';
import DropdownDate from '../dropdown-date/dropdown-date';

class CardSearch extends CardForm {
  constructor(block) {
    super('card-search', block);
  }

  _initialize() {
    super._initialize();
    this._renderDropdownDate();
  }

  _renderDropdownDate() {
    const dropdownDate = this.block.querySelector(`.js-${this.blockName}__dropdown-date`);
    this.dropdownDate = new DropdownDate(dropdownDate);
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-card-search');
  blocks.forEach((block) => new CardSearch(block));
}

export default renderBlocks();
