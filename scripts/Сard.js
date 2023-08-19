export default class Card {
  constructor(name, link, templateSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.querySelector('.elements__card-item').cloneNode(true);
    return cardElement;
  }

  _handleDeleteClick() {
      this._cardElement.remove(); 
      this._cardElement = null;
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle('elements__heart-button_active');
}

  _setEventListeners() {
    this._deleteButton = this._cardElement.querySelector('.elements__delete-button');
    this._likeButton = this._cardElement.querySelector('.elements__heart-button');
    this._cardImage = this._cardElement.querySelector('.elements__image');
   
    this._deleteButton.addEventListener('click', () => { 
      this._handleDeleteClick()
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick()
    });
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    const cardImage = this._cardElement.querySelector('.elements__image');
    const cardTitle = this._cardElement.querySelector('.elements__card-title');

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
  
}