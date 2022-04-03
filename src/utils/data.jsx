const baseUrl = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } return Promise.reject(`Ошибка: ${res.status}`);
};

export { baseUrl, checkResponse };