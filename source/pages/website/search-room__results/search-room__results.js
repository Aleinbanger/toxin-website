/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import CardRoom from '../../../blocks/card-room/card-room';
import Pagination from '../../../blocks/pagination/pagination';

class SearchRoomResults {
  constructor(element) {
    this.element = element;
    this.elementName = this.element.classList[0];
    this._initialize();
    this._bindEventListeners();
  }

  _initialize() {
    this.resultsData = require('./search-room__results.json');
    this.resultsImages = require('./img/*.png');
    this.gridTemplate = this.element.querySelector(`.js-${this.elementName}-grid`);
    this.cardRoomTemplate = this.gridTemplate.querySelector('.js-card-room');
    this.pagination = this.element.querySelector('.js-pagination');
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
    this.pagination.addEventListener('click', (event) => this._handlePaginationClick(event));
  }

  _handlePaginationClick(event) {
    if (event.target.classList.contains('js-pagination__button-page')) {
      this.state.currentPage = this.paginationObj.state.currentPage;
      this._renderState();
    }
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
    const isPageCreated = this.pages.some((p) => Number(p.dataset.page) === Number(pageNumber));
    if (!isPageCreated) {
      const fromCard = this.state.itemsPerPage * (pageNumber - 1);
      let toCard = this.state.itemsPerPage * pageNumber;
      toCard = (toCard > this.state.itemsNumber)
        ? this.state.itemsNumber : toCard;
      const $page = $('<div>', {
        class: `${this.elementName}-grid js-${this.elementName}-grid`,
        'data-page': pageNumber,
      });
      $page.insertBefore(this.gridTemplate);
      this._populateResults($page, fromCard, toCard);
      this.pages.push($page[0]);
    }
  }

  _populateResults($page, from, to) {
    this.resultsData.rooms.slice(from, to).forEach((room) => {
      const $card = $(this.cardRoomTemplate).clone(true).removeClass('card-room_hidden');
      const attributes = ['number', 'luxury', 'price', 'rating', 'reviews'];
      attributes.forEach((attr) => $card.attr(`data-room-${attr}`, room[attr]));
      $card.find('.js-card-room__info').attr('href', room.href);
      $card.appendTo($page);
      const cardObj = new CardRoom($card[0]);
      const roomImgSrcList = room.imgSrcList.map((imgSrc) => this.resultsImages[imgSrc]);
      cardObj.carousel.populateCarousel(roomImgSrcList);
      cardObj.updateState();
    });
  }
}

export default SearchRoomResults;
