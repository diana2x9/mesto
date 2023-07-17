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
const saveButton = document.querySelector('.form__button-save');

config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button-save_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

//открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', EscClose);
  popup.addEventListener('click', overlayClose);
}

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', EscClose);
  popup.removeEventListener('click', overlayClose);
};

function fillProfileForm () {
  popupInputName.value = profileName.textContent;
  popupInputWork.value = profileText.textContent;
};

// открытие попапа редактирования профиля
editProfileButton.addEventListener('click', () => {
  openPopup(popupEdit);
  fillProfileForm();
  toggleButtonState(inputList, saveButton, config);
});

// закрытие попапа редактирования профиля
closeEditProfileButton.addEventListener('click', () => {
  closePopup(popupEdit);
});

//создание карточек
function createCard(name, link) {
  const cardTemplate = document.querySelector('#elements__card').content;
  const cardElement = cardTemplate.querySelector('.elements__card-item').cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardTitle = cardElement.querySelector('.elements__card-title');
  const deleteButton = cardElement.querySelector('.elements__delete-button');
  const likeButton = cardElement.querySelector('.elements__heart-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });
  
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('elements__heart-button_active');
  });

  //открытие изображения
  cardImage.addEventListener('click', () =>{
    openPopupImage(name, link);
  });

  return cardElement;
}

  initialCards.forEach((item) => {
    const cardElement = createCard(item.name, item.link);
    elementsGallery.appendChild(cardElement)
  })

// Функция для удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

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

function addCard(evt) {
  evt.preventDefault()
  const name = popupInputPlace.value;
  const link = popupInputImage.value;
  const cardElement = createCard (name, link);
  elementsGallery.prepend(cardElement);
  closePopup(popupAdd);
  popupAddForm.reset();
};

//редактирование профиля
function editProfile(evt) {
  evt.preventDefault()
  profileName.textContent = popupInputName.value;
  profileText.textContent = popupInputWork.value;
  closePopup(popupEdit);
};

function openPopupAdd() {
  openPopup(popupAdd);
};

function closePopupAdd() {
  closePopup(popupAdd);
};

//закрытие попапа esc
function EscClose(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

//закрытие попапа overlay
function overlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

popupEditForm.addEventListener('submit', editProfile);

addButton.addEventListener('click',openPopupAdd);

closeAddButton.addEventListener('click',closePopupAdd);

popupAddForm.addEventListener('submit', addCard);

closeImageButton.addEventListener('click', closePopupImage);
