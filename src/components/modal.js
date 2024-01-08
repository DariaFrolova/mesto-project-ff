export { openImagePopup, openPopup, closePopup, addNewCard };
import { createCard, removeCard } from "../components/card.js";
import { placesList, popupTypeNewCard } from "../index.js";

//Функция для роткрытия модального окна с изображением и подписью
const openImagePopup = (link, name) => {
  const popupImage = document.querySelector(".popup_type_image");
  const image = popupImage.querySelector(".popup__image");
  const caption = popupImage.querySelector(".popup__caption");

  image.setAttribute("src", link);
  image.setAttribute("alt", name);
  caption.textContent = name;

  openPopup(popupImage);
};

//Открываем модальное окно
const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
};

//Закрывем модальное окно
const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
};

//Получаем элементы формы для добавления новой карточки и добавляем обработчик для отправки формы
const inputTypeCardName = document.querySelector(
  ".popup__input_type_card-name"
);
const inputTypeUrl = document.querySelector(".popup__input_type_url");
const newPlaceFormPopup = document.querySelector("form[name='new-place']");

const addNewCard = (evt) => {
  evt.preventDefault();

  const newCardData = {
    name: inputTypeCardName.value,
    link: inputTypeUrl.value,
  };

  const newCard = createCard(newCardData, removeCard);
  placesList.prepend(newCard);

  closePopup(popupTypeNewCard);

  newPlaceFormPopup.reset();
};

newPlaceFormPopup.addEventListener("submit", addNewCard);
