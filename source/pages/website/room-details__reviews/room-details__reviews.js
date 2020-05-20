/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import Comment from '../../../blocks/comment/comment';

class RoomDetailsReviews {
  constructor(element) {
    this.element = element;
    this.elementName = this.element.classList[0];
    this._initialize();
  }

  _initialize() {
    this.reviewsData = require('./room-details__reviews.json');
    this.reviewsImages = require('./img/*.png');
    this.commentTemplate = this.element.querySelector('.js-comment');
    this.counter = this.element.querySelector(`.js-${this.elementName}-counter`);
    this._populateReviews();
    this._updateCounter();
  }

  _populateReviews() {
    this.reviewsData.reviews.forEach((r) => {
      const review = r;
      review.user.pictureSrc = this.reviewsImages[review.user.picture];
      const $commentContainer = $('<div>', { class: `${this.elementName}-item` });
      const $comment = $(this.commentTemplate).clone(true);
      const commentObj = new Comment($comment[0]);
      commentObj.updateComment(review);
      $comment.appendTo($commentContainer);
      $commentContainer.appendTo(this.element);
    });
  }

  _updateCounter() {
    const counterValue = this.reviewsData.reviews.length;
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
    this.counter.textContent = `${counterValue} ${counterText}`;
  }
}

export default RoomDetailsReviews;
