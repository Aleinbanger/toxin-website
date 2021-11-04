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
    this.$acceptButton = $('<span class="datepicker--button" data-action="hide">Применить</span>');
    this.$datepicker.find('.datepicker--buttons').append(this.$acceptButton);
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

export default CardCalendar;
