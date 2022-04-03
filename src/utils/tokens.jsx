import { setCookie } from './cookies';

export const getTokens = res => {
    const accessToken = res.accessToken.split('Bearer ')[1];
    const refreshToken = res.refreshToken;

    setCookie('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
}