//Открываем модальное окно
const openPopup = (popup) => {
  document.addEventListener("keydown", closePopupOnEsc);
  popup.classList.add("popup_is-opened");
};

//Закрывем модальное окно
const closePopup = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupOnEsc);
};

//Объявляем функцию для закрытия попапа; при выполнении вызывается closePopup
const createClosePopupHandler = (popup) => {
  const handler = (evt) => {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close")
    ) {
      closePopup(popup);
    }
  };
  return handler;
};

//Закрывем открытые попапы по нажатию на esc
const closePopupOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

export { openPopup, closePopup, closePopupOnEsc, createClosePopupHandler };
