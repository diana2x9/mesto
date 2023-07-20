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
const saveButtonEdit = popupEditForm.querySelector('#edit-button');
const saveButtonAdd = popupAddForm.querySelector('#add-button');


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

function fillProfileForm () {
  popupInputName.value = profileName.textContent;
  popupInputWork.value = profileText.textContent;
};

// открытие попапа редактирования профиля
editProfileButton.addEventListener('click', () => {
  openPopup(popupEdit); 
  fillProfileForm(); 
  toggleButtonState(inputList, saveButtonEdit, config); 
});

// закрытие попапа редактирования профиля
closeEditProfileButton.addEventListener('click', () => {
  closePopup(popupEdit);
});

const openAddPopup = () => {
  popupAddForm.reset();
  inputList = Array.from(popupAddForm.querySelectorAll(".form__input"));
  toggleButtonState(inputList, saveButtonAdd, config);
  hideInputError(popupAddForm, popupInputPlace, config);
  hideInputError(popupAddForm, popupInputImage, config);
  openPopup(popupAdd)
}
addButton.addEventListener('click', openAddPopup);


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

closeImageButton.addEventListener('click', closePopupImage);

function addCard(evt) {
  evt.preventDefault()
  const name = popupInputPlace.value;
  const link = popupInputImage.value;
  const cardElement = createCard (name, link);
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