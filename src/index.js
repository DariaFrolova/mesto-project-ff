
import './pages/index.css';
import { initialCards } from './cards.js';

import addIcon from './images/add-icon.svg';
import avatar from './images/avatar.jpg';
import cardOne from './images/card_1.jpg';
import cardTwo from './images/card_2.jpg'; 
import cardThree from './images/card_3.jpg'; 
import close from './images/close.svg'; 
import deleteIcon from './images/delete-icon.svg'; 
import editIcon from './images/edit-icon.svg'; 
import likeActive from './images/like-active.svg';
import likeInactive from './images/like-inactive.svg';
import logo from './images/logo.svg';

const images = [ 
  { name: 'add-Icon', link: addIcon },
  { name: 'avatar', link: avatar },
  { name: 'card_1', link: cardOne },
  { name: 'card_2', link: cardTwo },
  { name: 'card_3', link: cardThree },
  { name: 'close svg', link: close },
  { name: 'delete-icon', link: deleteIcon },
  { name: 'edit-icon', link: editIcon },
  { name: 'like-active', link: likeActive },
  { name: 'like-inactive', link: likeInactive },
  { name: 'logo', link: logo }
];

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





