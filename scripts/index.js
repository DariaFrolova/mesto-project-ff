// @todo: Темплейт карточки
// находим в DOM шаблон карточки, затем – находим внутри шаблона класс "card"
const cardTemplate = document.querySelector("#card-template").content;
const templateCard = cardTemplate.querySelector(".card");

// @todo: DOM узлы
// находим в DOM место, в которое будут добавляться карточки
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
// определяем функцию createCard, которая принимает объект item и функцию removeCard
// внутри функции клонируем шаблон 
const createCard = (item, removeCard) => { 
  const newCard = templateCard.cloneNode(true);
// Находим внутри карточки элементы
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const deleteButton = newCard.querySelector(".card__delete-button");

  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", item.name);
  cardTitle.textContent = item.name;

// добавляем обработчик события на кнопку удаления
  deleteButton.addEventListener("click", () => {
    removeCard(newCard);
  });
// возвращаем созданную карточку
  return newCard;
};

// функция удаления карточки
const removeCard = (card) => {
  card.remove();
};

// создаем массив данных. до каждого элемента массива стучимся map, затем - вызываем функцию createCard
// и передаем туда связку (item, removeCard). В результате получаем новый массив cards и каждая карточка
// попадет в конец родительского контейнера 
const cards = initialCards.map((item) => createCard(item, removeCard));
placesList.append(...cards);
