/* eslint-disable global-require */
import CardRoom from 'blocks/card-room/card-room';
import Pagination from 'blocks/pagination/pagination';
import { requireAll } from 'scripts/utils';

class SearchRoomResults {
  constructor(element) {
    this.elementName = 'search-room__results';
    this.element = element;
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.resultsData = require('./search-room__results.json');
    this.resultsImages = requireAll(require.context('./img/', true, /\.png$/));
    this.gridTemplate = this.element.querySelector(`.js-${this.elementName}-grid`);
    this.cardRoomTemplate = this.gridTemplate.querySelector(`.js-${this.elementName}-card`);
    this.pagination = this.element.querySelector(`.js-${this.elementName}-pagination`);
    this.pages = [];
    this.state = {
      currentPage: 1,
      itemsPerPage: this.resultsData.pagination.itemsPerPage,
      itemsNumber: this.resultsData.rooms.length,
    };
    this.state.pagesNumber = Math.ceil(this.state.itemsNumber / this.state.itemsPerPage);
    this._populatePagination();
    this._renderState();
  }

  _populatePagination() {
    this.paginationObj = new Pagination(this.pagination);
    this.paginationObj.populatePagination(this.state);
  }

  _bindEventListeners() {
    this.pagination.addEventListener('change', () => this._handlePaginationChange());
  }

  _handlePaginationChange() {
    this.state.currentPage = this.paginationObj.state.currentPage;
    this._renderState();
  }

  _renderState() {
    this._createPage(this.state.currentPage);
    this.pages.forEach((page) => {
      page.classList.add(`${this.elementName}-grid_hidden`);
    });
    this.pages.find((page) => Number(page.dataset.page) === Number(this.state.currentPage))
      .classList.remove(`${this.elementName}-grid_hidden`);
  }

  _createPage(pageNumber) {
    const isPageCreated = this.pages
      .some((page) => Number(page.dataset.page) === Number(pageNumber));
    if (!isPageCreated) {
      const fromCardNumber = this.state.itemsPerPage * (pageNumber - 1);
      const lastNumber = this.state.itemsPerPage * pageNumber;
      const toCardNumber = (lastNumber > this.state.itemsNumber)
        ? this.state.itemsNumber : lastNumber;

      const $page = $('<div>', {
        class: `${this.elementName}-grid js-${this.elementName}-grid`,
        'data-page': pageNumber,
      });
      $page.insertBefore(this.gridTemplate);
      this.pages.push($page[0]);
      this._populateResults($page, fromCardNumber, toCardNumber);
    }
  }

  _populateResults($page, from, to) {
    this.resultsData.rooms.slice(from, to).forEach((room) => {
      const $cardEl = $(this.cardRoomTemplate).clone(true);
      $cardEl.removeClass(`${this.elementName}-card_hidden`);
      $cardEl.appendTo($page);

      const cardObj = new CardRoom($cardEl[0]);
      const roomImgSrcList = room.imgSrcList.map((imgSrc) => this.resultsImages[imgSrc]);
      cardObj.updateState(room, roomImgSrcList);
    });
  }
}

export default SearchRoomResults;
