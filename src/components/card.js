export { createCard, removeCard };
import {
  openImagePopup,
  openPopup,
  closePopup,
  addNewCard,
} from "../components/modal.js";

const cardTemplate = document.querySelector("#card-template").content;

const templateCard = cardTemplate.querySelector(".card");

//Создаем новую карточку и добавляем обработчики
const createCard = (item, removeCard) => {
  const newCard = templateCard.cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const deleteButton = newCard.querySelector(".card__delete-button");
  const likeButton = newCard.querySelector(".card__like-button");

  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", item.name);
  cardTitle.textContent = item.name;

  deleteButton.addEventListener("click", () => {
    removeCard(newCard);
  });

  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
  });

  cardImage.addEventListener("click", () => {
    openImagePopup(item.link, item.name);
  });

  //Функция лайка
  const likeCard = (button) => {
    button.classList.toggle("card__like-button_is-active");
  };

  return newCard;
};

//Удаляем карточку
const removeCard = (card) => {
  card.remove();
};
