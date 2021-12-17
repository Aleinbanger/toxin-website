import FormValidator from '../../scripts/helpers/FormValidator';
import DropdownDate from '../dropdown-date/DropdownDate';

class CardSearch extends FormValidator {
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

export default CardSearch;
