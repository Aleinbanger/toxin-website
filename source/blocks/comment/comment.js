/* eslint-disable object-curly-newline */
import './comment.scss';
import ButtonLike from '../button-like/button-like';

class Comment {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
  }

  updateComment({ user, date, text, like }) {
    this.userName.textContent = user.name;
    this.userPicture.setAttribute('src', user.pictureSrc);
    this.date.textContent = date;
    this.text.textContent = text;
    this.buttonLike.updateState({ value: like.count, active: like.active });
  }

  _initialize() {
    this.userPicture = this.block.querySelector(`.js-${this.blockName}__picture`);
    this.userName = this.block.querySelector(`.js-${this.blockName}__name`);
    this.date = this.block.querySelector(`.js-${this.blockName}__date`);
    this.text = this.block.querySelector(`.js-${this.blockName}__text`);
    this.buttonLike = new ButtonLike(this.block.querySelector('.js-button-like'));
  }
}

export default Comment;
