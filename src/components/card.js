import { openImagePopup, handleNewCardAdd } from "../index.js";
import { openPopup, closePopup } from "../components/modal.js";

const cardTemplate = document.querySelector("#card-template");
const templateCard = cardTemplate.content.querySelector(".card");

const likeCard = (button) => {
  button.classList.toggle("card__like-button_is-active");
};

const removeCard = (card) => {
  card.remove();
};

const createCard = (item, removeCard, likeCard, openImagePopup) => {
  const newCard = templateCard.cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const deleteButton = newCard.querySelector(".card__delete-button");
  const likeButton = newCard.querySelector(".card__like-button");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
  });
  
  cardImage.addEventListener("click", () => {
    openImagePopup(item.link, item.name);
  });

  deleteButton.addEventListener("click", () => {
    removeCard(newCard);
  });

  return newCard;
};

export { createCard, removeCard, likeCard };
