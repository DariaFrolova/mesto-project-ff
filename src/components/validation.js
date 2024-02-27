import { validationConfig } from "../index.js";

// Функция отображения сообщения об ошибке для конкретного инпута
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Функция скрытия сообщения об ошибке
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
};

// Функция валидации и отображения ошибки/скрытия сообщения. Вызываем showInputError /  hideInputError в зависимости от результатов проверки
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch) {
      const errorMessage = inputElement.getAttribute("data-error-message");
      showInputError(formElement, inputElement, errorMessage, validationConfig);
    } else {
      const errorMessage = inputElement.validationMessage;
      showInputError(formElement, inputElement, errorMessage, validationConfig);
    }
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }

  const form = inputElement.closest(validationConfig.formSelector);
  const inputList = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = form.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(validationConfig, inputList, buttonElement);
};

// Функция для проверки наличия валидных инпутов в списке
const hasInvalidInput = (inputList) =>
  inputList.some((inputElement) => !inputElement.validity.valid);

// Функция для изменения состояния кнопки в зависимости от валидности инпутов
const toggleButtonState = (validationConfig, inputList, buttonElement) => {
  const isInvalid = hasInvalidInput(inputList);
  buttonElement.disabled = isInvalid;
  buttonElement.classList.toggle(
    validationConfig.inactiveButtonClass,
    isInvalid
  );
};

// Устанавливаем обработчиков событий на инпуты с учетом изменения валидации
const setEventListeners = (validationConfig, formElement, buttonElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  toggleButtonState(validationConfig, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationConfig);
    });
  });
};

// Функция для очистки состояния валидации формы и сокрытия сообщений об ошибке
const clearValidation = (validationConfig, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
};

// Функция для включения валидации на все формы на странице и установки обработчиков событий
const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      setEventListeners(
        validationConfig,
        formElement,
        formElement.querySelector(validationConfig.submitButtonSelector)
      );
    });

    setEventListeners(
      validationConfig,
      formElement,
      formElement.querySelector(validationConfig.submitButtonSelector)
    );
  });
};

export { enableValidation, clearValidation };

