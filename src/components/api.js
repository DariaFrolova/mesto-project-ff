const configApi = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "58e6624f-a0fc-46a5-949f-6be2e96427b3",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

export const getInitialCards = () => {
  return fetch(`${configApi.baseUrl}/cards`, {
    method: "GET",
    headers: configApi.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

export const updateInitialCards = (cardName, cardLink) => {
  return fetch(`${configApi.baseUrl}/cards`, {
    method: "POST",
    headers: configApi.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};

export const deleteCard = (cardId) => {
  return fetch(`${configApi.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: configApi.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

export const likeCard = (cardId) => {
  return fetch(`${configApi.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: configApi.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

export const dislikeCard = (cardId) => {
  return fetch(`${configApi.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: configApi.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

export const getProfileInfo = () => {
  return fetch(`${configApi.baseUrl}/users/me`, {
    headers: configApi.headers,
  }).then((res) => {
    return handleResponse(res);
  });
};

export const updateProfileInfo = (newNameProfile, newAboutProfile) => {
  return fetch(`${configApi.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      name: newNameProfile,
      about: newAboutProfile,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};

export const changeAvatar = (url) => {
  return fetch(`${configApi.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: configApi.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
};
