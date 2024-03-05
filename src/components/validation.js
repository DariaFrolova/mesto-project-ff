// Функция отображения сообщения об ошибке для конкретного инпута
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Функция скрытия сообщения об ошибке для конкретного инпута
const hideInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
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

// добавляем слушатели на инпуты
const setEventListeners = (
  validationConfig,
  formElement,
  buttonElement,
  inputList
) => {
  const handleInput = (inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(validationConfig, inputList, buttonElement);
    });
  };

  inputList.forEach(handleInput);
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

// валидация формы
const enableValidation = (validationConfig) => {
  const formList = document.querySelectorAll(validationConfig.formSelector);

  formList.forEach((formElement) => {
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );

    const handleInput = (inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButtonState(validationConfig, inputList, buttonElement);
      });
    };

    inputList.forEach(handleInput);

    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    toggleButtonState(validationConfig, inputList, buttonElement);
  });
};

export { enableValidation, clearValidation };
