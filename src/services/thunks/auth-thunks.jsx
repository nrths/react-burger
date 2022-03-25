import { baseUrl } from '../../utils/data';
import { createUser, createUserSuccess, createUserFailed } from '../slices/authorization';


export function registration({ email, password, name }) {
    return function (dispatch) {
        fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ email, password, name }),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            dispatch(createUserSuccess(data));
        })
        .catch(err => {console.log(err)
            dispatch(createUserFailed(err))
        });
}}