import Card from './card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './constants.js';
import { config } from './constants.js';

const popupEdit = document.querySelector('.popup-edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const closeEditProfileButton = popupEdit.querySelector('.popup__button-close');
const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = popupAdd.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const popupInputName = document.querySelector('#name-input');
const popupInputWork = document.querySelector('#work-input');
const popupEditForm = document.querySelector('#form-edit');
const popupAddForm = document.querySelector('#form-add');
const popupImage = document.querySelector('.popup_image');
const popupPicture = popupImage.querySelector('.popup__picture');
const popupTitle = popupImage.querySelector('.popup__title');
const closeImageButton = popupImage.querySelector('.popup__button-close');
const popupInputPlace = document.querySelector('#place-input');
const popupInputImage = document.querySelector('#image-input');
const elementsGallery = document.querySelector('.elements');


//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEsc);
  popup.addEventListener('click', closeByOverlay);
}

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEsc);
  popup.removeEventListener('click', closeByOverlay);
};

// открытие попапа редактирования профиля
editProfileButton.addEventListener('click', () => {
  popupInputName.value = profileName.textContent;
  popupInputWork.value = profileText.textContent;
  openPopup(popupEdit);
});

// закрытие попапа редактирования профиля
closeEditProfileButton.addEventListener('click', () => {
  closePopup(popupEdit);
});

// функция попапа добавления фото
const openAddPopup = () => {
  popupAddForm.reset();
  openPopup(popupAdd)
}
addButton.addEventListener('click', openAddPopup);


function createCardElement(data) {
  const card = new Card(data.name, data.link, '#elements__card', openPopupImage);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = createCardElement(item);
  elementsGallery.appendChild(cardElement);
});

// Функция открытия попапа картинки
function openPopupImage(name, link) {
  popupPicture.src = link;
  popupPicture.alt = name;
  popupTitle.textContent = name;
  openPopup(popupImage);
};

// Функция для закрытия попапа картинки
function closePopupImage() {
  closePopup(popupImage);
}

closeImageButton.addEventListener('click', closePopupImage);

function addCard(evt) {
  evt.preventDefault();
  const items = {};
  items.name = popupInputPlace.value;
  items.link = popupInputImage.value;
  const cardElement = createCardElement (items);
  elementsGallery.prepend(cardElement);
  closePopup(popupAdd);
  evt.target.reset()
};

popupAddForm.addEventListener('submit', addCard);

//редактирование профиля
function editProfile(evt) {
  evt.preventDefault()
  profileName.textContent = popupInputName.value;
  profileText.textContent = popupInputWork.value;
  closePopup(popupEdit);
};

popupEditForm.addEventListener('submit', editProfile);

function openPopupAdd() {
  openPopup(popupAdd);
};

function closePopupAdd() {
  closePopup(popupAdd);
};

//закрытие попапа esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

//закрытие попапа overlay
function closeByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

closeAddButton.addEventListener('click',closePopupAdd);

//экземпляр валидации редактирования профиля
const formEditProfileValidator = new FormValidator(config, popupEditForm);
//экземпляр валидации добавления карточки
const formAddCardValidator = new FormValidator(config, popupAddForm);

//валидация форм
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();