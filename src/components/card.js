//Функция, создающая карточку из шаблона
export const createCard = (item, removeCard, openImagePopup) => {
const createCard = (item, removeCard) => {
  // Клонируем шаблон
  const newCard = templateCard.cloneNode(true);
  // Находим элементы карточки внутри клонированного шаблона
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const deleteButton = newCard.querySelector(".card__delete-button");
  const likeButton = newCard.querySelector(".card__like-button");

  // Заполняем данные карточки 
  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", item.name);
  cardTitle.textContent = item.name;

  // Добавляем обработчик на кнопку удаления
  deleteButton.addEventListener("click", () => {
    removeCard(newCard);
  });
  // Добавляем обработчик на like
  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
  });
  // Добавляем обработчик события на картинку для открытия попапа с картинкой
  cardImage.addEventListener("click", () => {
    openImagePopup(item.link, item.name);
  });
  // Функция, меняющая стиль кнопки like
  const likeCard = (button) => {
    button.classList.toggle('card__like-button_is-active');
  };
  // Возвращаем созданную карточку
  return newCard;
};
};

// Функция удаления карточки
export const removeCard = (card) => {
    card.remove();
  };

///