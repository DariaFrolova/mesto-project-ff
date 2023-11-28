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

  // @todo: Функция удаления карточки
  // добавляем слушатель на кнопку удаления. При клике удаляем из DOM карточку.
  deleteButton.addEventListener("click", () => {
    newCard.remove();
  });
  // Возвращаем созданную карточку
  return newCard;
};

// @todo: Вывести карточки на страницу
// создаем массив, к каждому элементу initialCards применяем createCard и добавляем в DOM
// через append все карточки из массива
const cards = initialCards.map((item) => createCard(item));
placesList.append(...cards);
