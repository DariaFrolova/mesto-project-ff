import "./pages/index.css";
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
  removeLikeRequest,
  addLikeRequest,
} from "./components/api.js";

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

let myID = "";
let buttonOriginalText = "";

Promise.all([getInitialCards(), getProfileInfo()])
  .then((results) => {
    myID = results[1]._id;

    profileTitle.textContent = results[1].name;
    profileDescription.textContent = results[1].about;
    profileImage.style.backgroundImage = `url('${results[1].avatar}')`;

    results[0].forEach((card) => {
      const newCard = createCard(
        card,
        removeCard,
        likeCard,
        openImagePopup,
        myID,
        addLikeRequest,
        removeLikeRequest,
        deleteCard
      );

      cardsContainer.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const updateButtonContent = (isLoading, button) => {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = buttonOriginalText; // восстанавливаем оригинальный текст кнопки
  }
};

// Попап с созданием карточки
profileAddButton.addEventListener("click", () => {
  // очищаем поля формы при открытии
  inputTypeCardName.value = "";
  inputTypeUrl.value = "";

  const popupAddCard = popupTypeNewCard;
  const form = popupAddCard.querySelector("form");

  // убираем текст валидации, возвращаем исходный текст кнопки при открытии попапа
  if (form) {
    clearValidation(validationConfig, form);
    buttonOriginalText =
      popupAddCard.querySelector(".popup__button").textContent;
  }

  openPopup(popupTypeNewCard);
});

// Обработка отправки формы при редактировании профиля
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

// функция открытия попапа с изображением
const openImagePopup = (link, name) => {
  image.src = link;
  image.alt = name;
  caption.textContent = name;

  openPopup(popupImage);
};

// Функция редактирования профиля
const openProfileEditPopup = () => {
  const popupProfileEdit = popupTypeEdit;
  const form = popupProfileEdit.querySelector("form");

  popupInputTypeName.value = profileTitle.textContent;
  popupInputTypeDescription.value = profileDescription.textContent;

  if (form) {
    clearValidation(validationConfig, form);
    buttonOriginalText =
      popupTypeEdit.querySelector(".popup__button").textContent;
  }

  openPopup(popupTypeEdit);
};

// Функция отправки формы новой карточки
const handleNewCardAdd = (evt) => {
  evt.preventDefault();

  updateButtonContent(true, evt.submitter);

  const newCardData = {
    name: inputTypeCardName.value,
    link: inputTypeUrl.value,
  };

  updateInitialCards(newCardData.name, newCardData.link)
    .then((data) => {
      const newCard = createCard(
        data,
        removeCard,
        likeCard,
        openImagePopup,
        myID,
        addLikeRequest,
        removeLikeRequest,
        deleteCard
      );

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

// Функция отправки формы с новым аватаром
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
  const popupAvatar = editAvatarPopup;
  const form = popupAvatar.querySelector("form");

  if (form) {
    clearValidation(validationConfig, form);
    avatarFormInput.value = "";
    buttonOriginalText =
      popupAvatar.querySelector(".popup__button").textContent;
  }

  openPopup(editAvatarPopup);
};

profileImage.addEventListener("click", openAvatarPopup);
profileEditButton.addEventListener("click", openProfileEditPopup);

profileForm.addEventListener("submit", handleProfileChangeSubmit);
newPlaceFormPopup.addEventListener("submit", handleNewCardAdd);
editAvatarPopup.addEventListener("submit", handleAvatarSubmit);

//функциональность закрытия попапов по клику
popupElements.forEach((popup) => {
  const handler = createClosePopupHandler(popup);
  popup.addEventListener("click", handler);
});

enableValidation(validationConfig);

export {
  cardsContainer,
  popupTypeNewCard,
  openImagePopup,
  handleNewCardAdd,
  validationConfig,
};
