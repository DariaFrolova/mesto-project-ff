import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, removeCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupOnEsc,
  closePopupHandler,
} from "./components/modal.js";

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
const popupForm = popupTypeEdit.querySelector(".popup__form");

//Объявляем функцию с открытием окна редактирования имени и специальности. Добавляем слушатель
const openProfileEditPopup = () => {
  openPopup(popupTypeEdit);
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
};
profileEditButton.addEventListener("click", openProfileEditPopup);

// Функция для обработки отправки формы редактирования профиля,
// обновляет инфо о профиле и закрывает модальное окно после сохранения изменений
const handleProfileChangeSubmit = (evt) => {
  evt.preventDefault();
  const newName = popupInputTypeName.value;
  const newDescription = popupInputTypeDescription.value;
  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;
  closePopup(popupTypeEdit);
};

popupForm.addEventListener("submit", handleProfileChangeSubmit);

//Добавляем обработчик на кнопку добавления новой карточки
const profileAddButton = document.querySelector(".profile__add-button");
profileAddButton.addEventListener("click", () => openPopup(popupTypeNewCard));

const popupTypeNewCard = document.querySelector(".popup_type_new-card");

// Для каждого элемента popup добавляем обработчик, по которому закроется попап по клику
popupElements.forEach((popup) => {
  const handler = closePopupHandler(popup);
  popup.addEventListener("click", handler);
});

const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

const openImagePopup = (link, name) => {
  image.src = link;
  image.alt = name;
  caption.textContent = name;

  openPopup(popupImage);
};

// Получаем элементы ввода и форму. Добавляем обоаботчик отправки формы. Извлекаем данные из полей и создаем новую карточку
const inputTypeCardName = document.querySelector(
  ".popup__input_type_card-name"
);
const inputTypeUrl = document.querySelector(".popup__input_type_url");
const newPlaceFormPopup = document.querySelector("form[name='new-place']");

const handleNewCardAdd = (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: inputTypeCardName.value,
    link: inputTypeUrl.value,
  };

  const newCard = createCard(newCardData, removeCard);
  // Добавляем новую карточку в начало списка 
  placesList.prepend(newCard);
  // Закрываем попап для добавления новой карточки
  closePopup(popupTypeNewCard);
  // Сбрасываем поля ввода формы
  newPlaceFormPopup.reset();
};

newPlaceFormPopup.addEventListener("submit", handleNewCardAdd);

export { placesList, popupTypeNewCard, openImagePopup, handleNewCardAdd };
