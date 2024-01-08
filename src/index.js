import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, removeCard } from "./components/card.js";
import {
  openImagePopup,
  openPopup,
  closePopup,
  addNewCard,
} from "./components/modal.js";
export { placesList, popupTypeNewCard };

const placesList = document.querySelector(".places__list");

//Созданные карточки помещаем в начало списка
const cards = initialCards.map((item) => createCard(item, removeCard));
placesList.append(...cards);

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
const form = popupTypeEdit.querySelector(".popup__form");

//Добавляем обработчик события на кнопку редактирования профиля
profileEditButton.addEventListener("click", () => {
  openPopup(popupTypeEdit);
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
});

//Добавляем обработчик на модальное окно
popupElements.forEach((popup) => {
  const closePopupHandler = (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  };
  popup.addEventListener("click", closePopupHandler);
});

//Закрывем попапы по нажатию на esc
const closePopupOnEsc = (evt) => {
  if (evt.key === "Escape") {
    popupElements.forEach((popup) => {
      closePopup(popup);
    });
  }
};

document.addEventListener("keydown", closePopupOnEsc);

// Функция для обработки отправки формы редактирования профиля,
// обновляет информацию о профиле и закрывает модальное окно после сохранения изменений
const changeProfFormSubmit = (evt) => {
  evt.preventDefault();
  const newName = popupInputTypeName.value;
  const newDescription = popupInputTypeDescription.value;
  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;
  closePopup(popupTypeEdit);
};

form.addEventListener("submit", changeProfFormSubmit);

//Добавляем обработчик на кнопку добавления новой карточки
const profileAddButton = document.querySelector(".profile__add-button");
profileAddButton.addEventListener("click", () => openPopup(popupTypeNewCard));

const popupTypeNewCard = document.querySelector(".popup_type_new-card");

// Функция для обработки клика по карточке
const handleCardClick = (link, name) => {
  openImagePopup(link, name);
};
