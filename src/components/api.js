// При каждом запросе нужно передавать токен и идентификатор группы
// соответственно, нужно делать конфиг с именем и токеном 

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7', // 
    headers: {
      authorization: '58e6624f-a0fc-46a5-949f-6be2e96427b3', //  мой действительный токен
      "Content-Type": "application/json",
    },
  };
  
  function getProfileData() {
    return fetch (`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })

    .then((res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }) 
}