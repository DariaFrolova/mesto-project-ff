import { validationConfig } from "../index.js";

// чтобы не забыть - это из файла index
// const validationConfig = {
//     formSelector: ".popup__form",
//     inputSelector: ".popup__input",
//     submitButtonSelector: ".popup__button",
//     inactiveButtonClass: "popup__button_disabled",
//     inputErrorClass: "popup__input_type_error",
//     errorClass: "popup__error_visible",
//   };

// Отображаем сообщение об ошибке и добавляем класс ошибки к инпуту
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
};

// Скрываем сообщение об ошибке и удаляем класс из интупа
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

// Проверяем валидность инпута, в зависимости от результата вызываем showInputError или hideInputError
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// Обеспечиваем начальное состояние формы перед началом ввода данных - сообщения об ошибках скрыты, и кнопка отправки формы отключена
const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((input) => {
    hideInputError(formElement, input, validationConfig);
  });

  submitButton.classList.add(validationConfig.inactiveButtonClass);
};

// Устанавливаем слушатели на форме, отменяем стандартное поведение
const setEventListeners = (formElement, validationConfig) => {
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
// Получаем все поля для отправки 
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
// Добавляем слушатель на каждое поле
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
        // проверяем валидность
      checkInputValidity(formElement, inputElement, validationConfig);
      const isValid = inputList.every((input) => input.validity.valid);
      // обновляем состояние кнопки 
      if (isValid) {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      } else {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
      }
    });
  });
//очищаем сообщение об ошибке
  clearValidation(formElement, validationConfig);
};

// функция включения валидации форм
const enableValidation = (validationConfig) => {
    //получаем все формы
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  //ставим слушатели на каждую форму
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });

  // добавляем keydown для проверки валидации при нажатии enter 
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (!e.target.form.checkValidity()) {
          e.preventDefault();
          return false;
        }
      }
    });
  });
};

export { enableValidation, clearValidation };
