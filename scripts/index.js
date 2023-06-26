const popup = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__button_close');

const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const popupInputName = document.querySelector('.popup__input_name');
const popupInputWork = document.querySelector('.popup__input_work');

const popupForm = document.querySelector('.popup__form');
const popupButtonSave = document.querySelector('.popup__button_save');

function openPopup() {
  popupInputName.value = profileName.textContent;
  popupInputWork.value = profileText.textContent;
  popup.classList.add('popup_opened');
}


function closePopup() {
  popup.classList.remove('popup_opened');
}


function saveProfile(event) {
  event.preventDefault()
  profileName.textContent = popupInputName.value;
  profileText.textContent = popupInputWork.value;
}

editProfileButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup)
popupForm.addEventListener('submit', saveProfile);
popupForm.addEventListener('submit', closePopup);
