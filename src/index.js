import "./pages/index.css";
import { initialCards } from "./cards.js";

import addIcon from "./images/add-icon.svg";
import avatar from "./images/avatar.jpg";
import cardOne from "./images/card_1.jpg";
import cardTwo from "./images/card_2.jpg";
import cardThree from "./images/card_3.jpg";
import close from "./images/close.svg";
import deleteIcon from "./images/delete-icon.svg";
import editIcon from "./images/edit-icon.svg";
import likeActive from "./images/like-active.svg";
import likeInactive from "./images/like-inactive.svg";
import logo from "./images/logo.svg";

const images = [
  { name: "add-Icon", link: addIcon },
  { name: "avatar", link: avatar },
  { name: "card_1", link: cardOne },
  { name: "card_2", link: cardTwo },
  { name: "card_3", link: cardThree },
  { name: "close svg", link: close },
  { name: "delete-icon", link: deleteIcon },
  { name: "edit-icon", link: editIcon },
  { name: "like-active", link: likeActive },
  { name: "like-inactive", link: likeInactive },
  { name: "logo", link: logo },
];

// Находим в DOM шаблон карточки
const cardTemplate = document.querySelector("#card-template").content;
// Получаем шаблон карточки
const templateCard = cardTemplate.querySelector(".card");
// Находим в DOM место, в которое будут добавляться карточки
const placesList = document.querySelector(".places__list");

// Функция, создающая карточку из шаблона
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

// Функция удаления карточки
const removeCard = (card) => {
  card.remove();
};

// Создаем массив карточек и добавляем их в конец родительского контейнера 
const cards = initialCards.map((item) => createCard(item, removeCard));
placesList.append(...cards);

//popup

// Находим кнопку редактирования профиля
const profileEditButton = document.querySelector(".profile__edit-button");
// Находим попап формы редактирования профиля
const popupTypeEdit = document.querySelector(".popup_type_edit");
// Находим поля Имя и Занятие в форме редактирования профиля
const popupInputTypeName = popupTypeEdit.querySelector(".popup__input_type_name");
const popupInputTypeDescription = popupTypeEdit.querySelector(".popup__input_type_description");
// Находим элементы Имени и Занятия  
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// Получаем все элементы с классом 'popup' для реализации закрытия попапа
const popupElements = document.querySelectorAll(".popup");
// Получаем форму внутри попапа для редактирования профиля
const form = popupTypeEdit.querySelector(".popup__form");

// Функция для открытия попапа
const openPopup = (popup) => {
  popup.classList.add("popup_is-opened");
};

// Функция для закрытия попапа
const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
};

// Добавляем обработчик для кнопки редактирования профиля. 
profileEditButton.addEventListener("click", () => {
  openPopup(popupTypeEdit);
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
});

//Добавляем обработчик для каждого попапа. 
popupElements.forEach((popup) => {
  const closePopupHandler = (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  };
  popup.addEventListener("click", closePopupHandler);
});

// Добавляем обработчик keydown для закрытия всех попапов при нажатии на 'Escape'. 
const closePopupOnEsc = (evt) => {
  if (evt.key === "Escape") {
    popupElements.forEach((popup) => {
      closePopup(popup);
    });
  }
};

document.addEventListener("keydown", closePopupOnEsc);

// Добавляем обработчик события для отправки формы в попапе редактирования профиля
const changeProfFormSubmit = (evt) => {
  evt.preventDefault();
  const newName = popupInputTypeName.value;
  const newDescription = popupInputTypeDescription.value;
  profileTitle.textContent = newName;
  profileDescription.textContent = newDescription;
  closePopup(popupTypeEdit);
};

form.addEventListener("submit", changeProfFormSubmit);

//Добавляем карточки

// Находим кнопку для добавления новой карточки и добавляем обработчик события 'click'
const profileAddButton = document.querySelector(".profile__add-button");
profileAddButton.addEventListener("click", () => openPopup(popupTypeNewCard));
// Находим модальное окно для добавления новой карточки
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const inputTypeCardName = document.querySelector(".popup__input_type_card-name");
const inputTypeUrl = document.querySelector(".popup__input_type_url");
const newPlaceFormPopup = document.querySelector("form[name='new-place']");
// Функция для добавления новой карточки
const addNewCard = (evt) => {
  evt.preventDefault();
  // Создаем объект с данными - имя и URL из полей ввода
  const newCardData = {
    name: inputTypeCardName.value,
    link: inputTypeUrl.value,
  };
  // Создаем и добавляем в начало списка новую карточку
  const newCard = createCard(newCardData, removeCard);
  placesList.prepend(newCard);
  // Закрываем попап
  closePopup(popupTypeNewCard);
  // Очищаем поля формы
  newPlaceFormPopup.reset();
};

// Добавляем обработчик события для отправки формы
newPlaceFormPopup.addEventListener("submit", addNewCard);
// Функция открытия попапа с изображением
const openImagePopup = (link, name) => {
  // находим попап, изображение и подпись
  const popupImage = document.querySelector(".popup_type_image");
  const image = popupImage.querySelector(".popup__image");
  const caption = popupImage.querySelector(".popup__caption");
  // Устанавливаем атрибуты изображения и подписи 
  image.setAttribute("src", link);
  image.setAttribute("alt", name);
  caption.textContent = name;
  // Открываем попап с изображением
  openPopup(popupImage);
};
// Обработка клика по карточке для открытия попапа с изображением
const handleCardClick = (link, name) => {
  openImagePopup(link, name);
};


