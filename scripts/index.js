// @todo: Темплейт карточки
// находим в DOM шаблон карточки, затем – находим внутри шаблона класс "card"
const cardTemplate = document.querySelector("#card-template").content;
const templateCard = cardTemplate.querySelector(".card");

// @todo: DOM узлы
// находим в DOM место, в которое будут добавляться карточки
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
// определяем функцию (item) и клонируем. Находим внутри карточки контент.
const createCard = (item) => {
  const newCard = templateCard.cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const deleteButton = newCard.querySelector(".card__delete-button");

  cardImage.setAttribute("src", item.link);
  cardImage.setAttribute("alt", item.name);
  cardTitle.textContent = item.name;

// добавляем обработчик события клика на кнопку удаления
  deleteButton.addEventListener("click", removeCard);

// возвращаем созданную карточку
  return newCard;
};

// @todo: Функция удаления карточки.
// Добавляем обработчик, получаем элемент, находим ближайший элемент card, удаляем его из DOM
const removeCard = (evt) => {
  const target = evt.target;
  const card = target.closest(".card");
  card.remove();
};

// @todo: Вывести карточки на страницу
// создаем массив, к каждому элементу initialCards применяем createCard и добавляем в DOM
// через append все карточки из массива
const cards = initialCards.map((item) => createCard(item));
placesList.append(...cards);
