export default class FormValidator {
  constructor(validationConfig, formElement) {
    this.validationConfig = validationConfig; 
    this._formElement = formElement;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inputList = Array.from(this._formElement.querySelectorAll(this.validationConfig.inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inactiveButtonClass = validationConfig.inactiveButtonClass; 
    this._inputErrorClass = validationConfig.inputErrorClass; 
    this._errorClass = validationConfig.errorClass;
  }

  _showInputError (inputElement) { 
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(this._inputErrorClass); 
    errorElement.textContent = inputElement.validationMessage; 
    errorElement.classList.add(this._errorClass); 
  } 

  _hideInputError (inputElement) { 
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.remove(this._inputErrorClass); 
    errorElement.classList.remove(this._errorClass); 
    errorElement.textContent = ''; 
  } 
  
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  disableButton = () => {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableButton = () => {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }  

  enableValidation () {
    this._toggleButtonState();
    this._setEventListeners();
  }
}
