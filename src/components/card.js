import { openImagePopup, handleNewCardAdd, myID } from "../index.js";
import { openPopup, closePopup } from "../components/modal.js";

import {
  deleteCard,
  addLikeRequest,
  removeLikeRequest,
} from "../components/api.js";

const cardTemplate = document.querySelector("#card-template");
const templateCard = cardTemplate.content.querySelector(".card");

const likeCard = (likeButton, cardId, cardLikes) => {
  // const likeCard = (likeButton, cardId, cardLikes, addLikeRequest, removeLikeRequest) => { //ИЗБАВЛЯЕМСЯ ОТ ИМПОРТА -> из промиса
  if (likeButton.classList.contains("card__like-button_is-active")) {
    removeLikeRequest(cardId)
    // removeLikeRequest(removeLikeRequest, cardId) // ИЗБ
      .then((data) => {
        likeButton.classList.remove("card__like-button_is-active");
        cardLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    addLikeRequest(cardId)
    // addLikeRequest(addLikeRequest, cardId) // ИЗБ
      .then((data) => {
        likeButton.classList.add("card__like-button_is-active");
        cardLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

// const likeCard = (likeButton, cardId, cardLikes, addLikeRequest, removeLikeRequest) => {
//   if (likeButton.classList.contains("card__like-button_is-active")) {
//     removeLikeRequest(cardId)
//       .then((data) => {
//         likeButton.classList.remove("card__like-button_is-active");
//         cardLikes.textContent = data.likes.length;
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   } else {
//     addLikeRequest(cardId)
//       .then((data) => {
//         likeButton.classList.add("card__like-button_is-active");
//         cardLikes.textContent = data.likes.length;
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }
// };

const removeCard = (card, cardId) => {
  // const removeCard = (card, cardId, deleteCard) => { //ИЗБАВЛЯЕМСЯ ОТ ИМПОРТА -> из промиса
  deleteCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.error(err);
    });
};

// const removeCard = (card, cardId, deleteCard) => {
//   deleteCard(cardId)
//     .then(() => {
//       card.remove();
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };


const createCard = (item, removeCard, likeCard, openImagePopup, myID) => {
//   // const createCard = (item, removeCard, likeCard, openImagePopup, myID, addLikeRequest, removeLikeRequest, deleteCard) => { //ИЗБАВЛЯЕМСЯ ОТ ИМПОРТА -> из промиса
//   const newCard = templateCard.cloneNode(true);
// const createCard = (item, removeCard, likeCard, openImagePopup, myID, addLikeRequest, removeLikeRequest, deleteCard) => {
  const newCard = templateCard.cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const deleteButton = newCard.querySelector(".card__delete-button");

  const likeButton = newCard.querySelector(".card__like-button");
  const cardLikes = newCard.querySelector(".card__like-number");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  cardLikes.textContent = item.likes.length;

  likeButton.addEventListener("click", () => {
    likeCard(likeButton, item._id, cardLikes);
  });

  if (item.likes.some(({ _id }) => _id === myID)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => {
    openImagePopup(item.link, item.name);
  });

 // Если это моя карточка, делаем кнопку удаления видимой
  if (item.owner._id === myID) {
    deleteButton.style.display = "block"; 
    deleteButton.addEventListener("click", () => {
        removeCard(newCard, item._id);
        // removeCard(newCard, item._id, deleteCard); // ИЗБ
    });
  }
 

  return newCard;
};


export { createCard, removeCard, likeCard };
