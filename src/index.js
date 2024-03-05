import "./pages/index.css";
// import { initialCards } from "./components/cards.js"; //удалено, чтобы на странице остались только карточки с сервера
import { createCard, removeCard, likeCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  closePopupOnEsc,
  createClosePopupHandler,
} from "./components/modal.js";

import { enableValidation, clearValidation } from "./components/validation.js";

import {
  getInitialCards,
  updateInitialCards,
  deleteCard,
  getProfileInfo,
  updateProfileInfo,
  changeAvatar,
} from "./components/api.js";

// export const myID = '';
// Валидация
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupInputTypeName = popupTypeEdit.querySelector(
  ".popup__input_type_name"
);
const popupInputTypeDescription = popupTypeEdit.querySelector(
  ".popup__input_type_description"
);
const editAvatarPopup = document.querySelector(".popup_type_edit-avatar");
const avatarFormInput = document.querySelector(".popup__input_type_avatar-url");

const popupElements = document.querySelectorAll(".popup");
const profileForm = popupTypeEdit.querySelector(".popup__form");

const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const cardsContainer = document.querySelector(".places__list");

const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const caption = popupImage.querySelector(".popup__caption");

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const inputTypeCardName = document.querySelector(
  ".popup__input_type_card-name"
);
const inputTypeUrl = document.querySelector(".popup__input_type_url");
const newPlaceFormPopup = document.querySelector("form[name='new-place']");

// Используем Promise.all для выполнения нескольких асинхронных операций
Promise.all([getInitialCards(), getProfileInfo()])
  .then((results) => {
    const myID = results[1]._id;

    profileTitle.textContent = results[1].name;
    profileDescription.textContent = results[1].about;
    profileImage.style.backgroundImage = `url('${results[1].avatar}')`;

    // Показываем карточки с сервера на странице
    results[0].forEach((card) => {
      const newCard = createCard(
        card,
        removeCard,
        likeCard,
        openImagePopup,
        myID
      );
    // results[0].forEach((card) => {
    //   const newCard = createCard(card, (card) => {
    //     removeCard(card, myID);
    //   },
    //   (likeButton, cardId, cardLikes) => {
    //     likeCard(likeButton, cardId, cardLikes, myID);
    //   },
    //   () => {
    //     openImagePopup();
    //   });
      cardsContainer.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Функция уведомления о сохранении
const updateButtonContent = (isLoading, button) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = button.dataset.buttonText;
  }
};

// функция открытия попапа с изображением
const openImagePopup = (link, name) => {
  image.src = link;
  image.alt = name;
  caption.textContent = name;

  openPopup(popupImage);
};

// Функция редактирования профиля.
// После клика на кнопку "редактировать профиль", пользователю открывается попап для редактирования профиля
const openProfileEditPopup = () => {
  openPopup(popupTypeEdit);
  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;
};

// Обновление информации в профиле
const handleProfileChangeSubmit = (evt) => {
  evt.preventDefault();

  updateButtonContent(true, evt.submitter);

  const newName = popupInputTypeName.value;
  const newDescription = popupInputTypeDescription.value;

  updateProfileInfo(newName, newDescription)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      updateButtonContent(false, evt.submitter);
    });
};

// Для каждого элемента popup добавляем обработчик, по которому закроется попап по клику
popupElements.forEach((popup) => {
  const handler = createClosePopupHandler(popup);
  popup.addEventListener("click", handler);
});

const handleNewCardAdd = (evt) => {
  evt.preventDefault();

  updateButtonContent(true, evt.submitter);

  const newCardData = {
    name: inputTypeCardName.value,
    link: inputTypeUrl.value,
  };

  updateInitialCards(newCardData.name, newCardData.link)
    .then((data) => {
      const newCard = createCard(data, removeCard, likeCard, openImagePopup);
      cardsContainer.prepend(newCard);
      closePopup(popupTypeNewCard);
      newPlaceFormPopup.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      updateButtonContent(false, evt.submitter);
    });
};

// Обновление аватара
const handleAvatarSubmit = (evt) => {
  evt.preventDefault();
  const avatarLink = avatarFormInput.value;

  updateButtonContent(true, evt.submitter);

  changeAvatar(avatarLink)
    .then((data) => {
      profileImage.style.backgroundImage = `url('${data.avatar}')`;
      closePopup(editAvatarPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      updateButtonContent(false, evt.submitter);
    });
};

// Функция открытия попапа с аватаркой
const openAvatarPopup = () => {
  openPopup(editAvatarPopup);
};

profileImage.addEventListener("click", openAvatarPopup);
profileEditButton.addEventListener("click", openProfileEditPopup);
profileForm.addEventListener("submit", handleProfileChangeSubmit);
profileAddButton.addEventListener("click", () => openPopup(popupTypeNewCard));
newPlaceFormPopup.addEventListener("submit", handleNewCardAdd);
editAvatarPopup.addEventListener("submit", handleAvatarSubmit);

enableValidation(validationConfig);

export {
  cardsContainer,
  popupTypeNewCard,
  openImagePopup,
  handleNewCardAdd,
  validationConfig,
};
