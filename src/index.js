import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, removeCard, likeCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupOnEsc,
  createClosePopupHandler,
} from "./components/modal.js";

import { enableValidation, clearValidation } from "./components/validation.js";

const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

// функция открытия попапа с изображением
const openImagePopup = (link, name) => {
  image.src = link;
  image.alt = name;
  caption.textContent = name;

  openPopup(popupImage);
};

// Получаем контейнер и помещаем новую карточку в начало списка
const cardsContainer = document.querySelector(".places__list");
const cards = initialCards.map((item) =>
  createCard(item, removeCard, likeCard, openImagePopup)
);
cardsContainer.append(...cards);

// Получаем элементы для редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupInputTypeName = popupTypeEdit.querySelector(
  ".popup__input_type_name"
);
const popupInputTypeDescription = popupTypeEdit.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupElements = document.querySelectorAll(".popup");
const profileForm = popupTypeEdit.querySelector(".popup__form");

// Функция редактирования профиля
const openProfileEditPopup = () => {
  openPopup(popupTypeEdit);
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
};
profileEditButton.addEventListener("click", openProfileEditPopup);

const handleProfileChangeSubmit = (evt) => {
  evt.preventDefault();
  const newName = popupInputTypeName.value;
  const newDescription = popupInputTypeDescription.value;
  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;
  closePopup(popupTypeEdit);
};

profileForm.addEventListener("submit", handleProfileChangeSubmit);

//Добавляем обработчик на кнопку добавления новой карточки
const profileAddButton = document.querySelector(".profile__add-button");
profileAddButton.addEventListener("click", () => openPopup(popupTypeNewCard));

const popupTypeNewCard = document.querySelector(".popup_type_new-card");

// Для каждого элемента popup добавляем обработчик, по которому закроется попап по клику
popupElements.forEach((popup) => {
  const handler = createClosePopupHandler(popup);
  popup.addEventListener("click", handler);
});

// Получаем элементы ввода и форму. Добавляем обоаботчик отправки формы. Извлекаем данные из полей и создаем новую карточку
const inputTypeCardName = document.querySelector(
  ".popup__input_type_card-name"
);
const inputTypeUrl = document.querySelector(".popup__input_type_url");
const newPlaceFormPopup = document.querySelector("form[name='new-place']");

// Функция для работы с новой карточкой
const handleNewCardAdd = (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: inputTypeCardName.value,
    link: inputTypeUrl.value,
  };

  const newCard = createCard(newCardData, removeCard, likeCard, openImagePopup);
  // Добавляем новую карточку в начало списка
  cardsContainer.prepend(newCard);
  // Закрываем попап для добавления новой карточки
  closePopup(popupTypeNewCard);
  // Сбрасываем поля ввода формы
  newPlaceFormPopup.reset();
};

newPlaceFormPopup.addEventListener("submit", handleNewCardAdd);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

export {
  cardsContainer,
  popupTypeNewCard,
  openImagePopup,
  handleNewCardAdd,
  validationConfig,
};
