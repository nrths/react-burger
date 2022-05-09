import { wsUrl } from "../../utils/constants";
import { getCookie } from "../../utils/cookies";
import { wsInit, wsClose } from "../slices/web-socket";
import { useDispatch } from "../types/hooks-types";

export const getAllOrders = () => {
  return (dispatch = useDispatch()) => {
    dispatch(wsInit({ url: `${wsUrl}/orders/all` }));
  };
};

export const getUserOrders = () => {
  return (dispatch = useDispatch()) => {
    dispatch(
      wsInit({
        url: `${wsUrl}/orders`,
        token: getCookie('accessToken').replace('Bearer ', ''),
      })
    );
  };
};

export const closeWSConnection = () => {
  return (dispatch = useDispatch()) => {
    dispatch(wsClose());
  };
};
