/* eslint-disable global-require */
import Comment from 'blocks/comment/comment';
import { requireAll } from 'scripts/utils';

class RoomDetailsReviews {
  constructor(element) {
    this.elementName = 'room-details__reviews';
    this.element = element;
    this._initialize();
  }

  _initialize() {
    this.reviewsData = require('./room-details__reviews.json');
    this.reviewsImages = requireAll(require.context('./img/', true, /\.png$/));
    this.reviewTemplate = this.element.querySelector(`.js-${this.elementName}-item`);
    this.counter = this.element.querySelector(`.js-${this.elementName}-counter`);
    this._populateReviews();
    this._updateCounter();
  }

  _populateReviews() {
    this.reviewsData.reviews.forEach((r) => {
      const review = r;
      review.user.pictureSrc = this.reviewsImages[review.user.picture];
      const $reviewEl = $(this.reviewTemplate).clone(true);
      $reviewEl.removeClass(`${this.elementName}-item_hidden`);
      $reviewEl.appendTo(this.element);

      const reviewObj = new Comment($reviewEl[0]);
      reviewObj.updateComment(review);
    });
  }

  _updateCounter() {
    const getCounterText = (counterValue) => {
      let counterText;
      switch (counterValue) {
        case 1:
          counterText = 'отзыв';
          break;
        case 2:
        case 3:
        case 4:
          counterText = 'отзыва';
          break;
        default:
          counterText = 'отзывов';
      }
      return `${counterValue}\u00A0${counterText}`;
    };
    const counterValue = this.reviewsData.reviews.length;
    this.counter.textContent = getCounterText(counterValue);
  }
}

export default RoomDetailsReviews;
