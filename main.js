(()=>{"use strict";var e=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)},t=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)},r=function(e){if("Escape"===e.key){var r=document.querySelector(".popup_is-opened");r&&t(r)}},n=document.querySelector("#card-template").content.querySelector(".card"),o=function(e){e.classList.toggle("card__like-button_is-active")},c=function(e){e.remove()},u=function(e,t,r,o){var c=n.cloneNode(!0),u=c.querySelector(".card__image"),a=c.querySelector(".card__title"),i=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button");return u.src=e.link,u.alt=e.name,a.textContent=e.name,l.addEventListener("click",(function(){r(l)})),u.addEventListener("click",(function(){o(e.link,e.name)})),i.addEventListener("click",(function(){t(c)})),c},a=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""};function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var l,p=document.querySelector(".popup_type_image"),s=p.querySelector(".popup__image"),d=p.querySelector(".popup__caption"),y=function(t,r){s.src=t,s.alt=r,d.textContent=r,e(p)},f=document.querySelector(".places__list"),m=[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].map((function(e){return u(e,c,o,y)}));f.append.apply(f,function(e){if(Array.isArray(e))return i(e)}(l=m)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(l)||function(e,t){if(e){if("string"==typeof e)return i(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(e,t):void 0}}(l)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}());var _=document.querySelector(".profile__edit-button"),v=document.querySelector(".popup_type_edit"),S=v.querySelector(".popup__input_type_name"),q=v.querySelector(".popup__input_type_description"),k=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),E=document.querySelectorAll(".popup"),L=v.querySelector(".popup__form");_.addEventListener("click",(function(){e(v),S.value=k.textContent,q.value=b.textContent})),L.addEventListener("submit",(function(e){e.preventDefault();var r=S.value,n=q.value;k.textContent=r,b.textContent=n,t(v)})),document.querySelector(".profile__add-button").addEventListener("click",(function(){return e(g)}));var g=document.querySelector(".popup_type_new-card");E.forEach((function(e){var r=function(e){return function(r){(r.target===r.currentTarget||r.target.classList.contains("popup__close"))&&t(e)}}(e);e.addEventListener("click",r)}));var h,C=document.querySelector(".popup__input_type_card-name"),A=document.querySelector(".popup__input_type_url"),x=document.querySelector("form[name='new-place']");x.addEventListener("submit",(function(e){e.preventDefault();var r={name:C.value,link:A.value},n=u(r,c,o,y);f.prepend(n),t(g),x.reset()})),h={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Array.from(document.querySelectorAll(h.formSelector)).forEach((function(e){!function(e,t){e.addEventListener("submit",(function(e){e.preventDefault()}));var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){t.validity.valid?a(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.classList.add(n.errorClass),o.textContent=r}(e,t,t.validationMessage,r)}(e,o,t),r.every((function(e){return e.validity.valid}))?n.classList.remove(t.inactiveButtonClass):n.classList.add(t.inactiveButtonClass)}))})),function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);r.forEach((function(r){a(e,r,t)})),n.classList.add(t.inactiveButtonClass)}(e,t)}(e,h)})),document.querySelectorAll("input").forEach((function(e){e.addEventListener("keydown",(function(e){if("Enter"===e.key&&!e.target.form.checkValidity())return e.preventDefault(),!1}))}))})();