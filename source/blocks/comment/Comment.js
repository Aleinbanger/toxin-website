/* eslint-disable object-curly-newline */
import ButtonLike from '../button-like/ButtonLike';

class Comment {
  constructor(wrapper) {
    this.blockName = 'comment';
    this.block = wrapper.querySelector(`.js-${this.blockName}`);
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

    const buttonLike = this.block.querySelector(`.js-${this.blockName}__like`);
    this.buttonLike = new ButtonLike(buttonLike);
  }
}

export default Comment;
