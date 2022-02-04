import React from 'react';

const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } return Promise.reject(`Ошибка: ${res.status}`);
};

export { baseUrl, checkResponse };