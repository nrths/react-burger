import { wsUrl } from '../../utils/constants';
import { getCookie } from '../../utils/cookies';
import { wsInit, wsClose } from '../slices/web-socket'; 

export const getAllOrders = () => {
    return dispatch => {
        dispatch(wsInit({ url: `${wsUrl}/orders/all`}))
    }
}

export const getUserOrders = () => {
    return dispatch => {
        dispatch(wsInit({ url: `${wsUrl}/orders`, token: getCookie('accessToken').slice(7)}))
    }
}

export const closeWSConnection = () => {
    return dispatch => {
        dispatch(wsClose())
    }
}