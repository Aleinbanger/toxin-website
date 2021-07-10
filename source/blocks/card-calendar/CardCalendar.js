import './card-calendar.scss';

import 'air-datepicker';

class CardCalendar {
  constructor(block) {
    this.blockName = 'card-calendar';
    this.block = block;
    this._initialize();
  }

  _initialize() {
    this.state = {
      startAt: this.block.dataset.startAt,
      endAt: this.block.dataset.endAt,
      todayDate: this.block.dataset.todayDate,
    };
    this._renderDatepicker();
    this._selectDate(this.state.startAt, this.state.endAt, this.state.todayDate);
  }

  _renderDatepicker() {
    const options = {
      classes: `${this.blockName}__datepicker`,
      offset: 5,
      prevHtml: '<i class="material-icons">arrow_back</i>',
      nextHtml: '<i class="material-icons">arrow_forward</i>',
      navTitles: {
        days: 'MM yyyy',
      },
      dateFormat: 'd M',
      disableNavWhenOutOfRange: false,
      range: true,
      multipleDatesSeparator: ' \u2013 ',
      clearButton: true,
    };
    this.$datepicker = $(this.block).datepicker(options);
    this.$acceptBtn = $('<span class="datepicker--button" data-action="hide">Применить</span>');
    this.$datepicker.find('.datepicker--buttons').append(this.$acceptBtn);
  }

  _selectDate(from, to, today) {
    const date = [];
    if (from) {
      date.push(new Date(from));
      if (to) {
        date.push(new Date(to));
      }
    }
    this.$datepicker.data('datepicker').selectDate(date);
    if (today) {
      this.$datepicker.data('datepicker').date = new Date(today);
    }
  }
}

function renderBlocks() {
  const blocks = document.querySelectorAll('.js-card-calendar');
  blocks.forEach((block) => new CardCalendar(block));
}

export default renderBlocks();
