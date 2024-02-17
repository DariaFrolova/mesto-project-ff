import { validationConfig } from "../index.js";

// // чтобы не забыть - это из файла index
// // const validationConfig = {
// //     formSelector: ".popup__form",
// //     inputSelector: ".popup__input",
// //     submitButtonSelector: ".popup__button",
// //     inactiveButtonClass: "popup__button_disabled",
// //     inputErrorClass: "popup__input_type_error",
// //     errorClass: "popup__error_visible",
// //   };

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

// код до рефактора

// import { validationConfig } from "../index.js";

// // чтобы не забыть - это из файла index
// // const validationConfig = {
// //     formSelector: ".popup__form",
// //     inputSelector: ".popup__input",
// //     submitButtonSelector: ".popup__button",
// //     inactiveButtonClass: "popup__button_disabled",
// //     inputErrorClass: "popup__input_type_error",
// //     errorClass: "popup__error_visible",
// //   };

// // Отображаем сообщение об ошибке и добавляем класс ошибки к инпуту
// const showInputError = (
//   formElement,
//   inputElement,
//   errorMessage,
//   validationConfig
// ) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(validationConfig.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(validationConfig.errorClass);
// };

// // Скрываем сообщение об ошибке и удаляем класс из инпута
// const hideInputError = (formElement, inputElement, validationConfig) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(validationConfig.inputErrorClass);
//   errorElement.textContent = "";
//   errorElement.classList.remove(validationConfig.errorClass);
// };

// // Проверяем валидность инпута, в зависимости от результата вызываем showInputError или hideInputError
// const checkInputValidity = (formElement, inputElement, validationConfig) => {
//   if (!inputElement.validity.valid) {
//     const errorMessage = inputElement.validationMessage;
//     showInputError(formElement, inputElement, errorMessage, validationConfig);
//   } else {
//     hideInputError(formElement, inputElement, validationConfig);
//   }
// };

// // Обеспечиваем начальное состояние формы перед началом ввода данных - сообщения об ошибках скрыты, и кнопка отправки формы отключена
// const clearValidation = (formElement, validationConfig) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(validationConfig.inputSelector)
//   );
//   const submitButton = formElement.querySelector(
//     validationConfig.submitButtonSelector
//   );

//   inputList.forEach((input) => {
//     hideInputError(formElement, input, validationConfig);
//   });

//   submitButton.classList.add(validationConfig.inactiveButtonClass);
// };

// // Устанавливаем слушатели на форме, отменяем стандартное поведение
// const setEventListeners = (formElement, validationConfig) => {
//   formElement.addEventListener("submit", (evt) => {
//     evt.preventDefault();
//   });
//   // Получаем все поля для отправки
//   const inputList = Array.from(
//     formElement.querySelectorAll(validationConfig.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(
//     validationConfig.submitButtonSelector
//   );
//   // Добавляем слушатель на каждое поле
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       // проверяем валидность
//       checkInputValidity(formElement, inputElement, validationConfig);
//       const isValid = inputList.every((input) => input.validity.valid);
//       // обновляем состояние кнопки
//       if (isValid) {
//         buttonElement.classList.remove(validationConfig.inactiveButtonClass);
//       } else {
//         buttonElement.classList.add(validationConfig.inactiveButtonClass);
//       }
//     });
//   });

//   //очищаем сообщение об ошибке
//   clearValidation(formElement, validationConfig);
// };

// // функция включения валидации форм
// const enableValidation = (validationConfig) => {
//   //получаем все формы
//   const formList = Array.from(
//     document.querySelectorAll(validationConfig.formSelector)
//   );
//   //ставим слушатели на каждую форму
//   formList.forEach((formElement) => {
//     setEventListeners(formElement, validationConfig);
//   });

//   // добавляем keydown для проверки валидации при нажатии enter
//   document.querySelectorAll("input").forEach((input) => {
//     input.addEventListener("keydown", (e) => {
//       if (e.key === "Enter") {
//         if (!e.target.form.checkValidity()) {
//           e.preventDefault();
//           return false;
//         }
//       }
//     });
//   });
// };

// export { enableValidation, clearValidation };
