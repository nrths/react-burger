import { getCookie } from '../utils/cookies';

const baseUrl = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } return Promise.reject(`Ошибка: ${res.status}`);
};

const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getCookie('token')
}

export { baseUrl, checkResponse, authHeaders };