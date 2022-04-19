// import { wsActions } from '../slices/web-socket';
import { getFeedData } from '../slices/feed';
// import { wsUrl } from '../../utils/constants'

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

    return next => action => {

      const { wsInit, wsClose, wsError, wsSuccess } = wsActions;
      const { dispatch } = store
      const { type, payload } = action

      if (type === wsInit.type) {
        const wsUrl = payload.token ? `${payload.url}?token=${payload.token}` : `${payload.url}`   
        socket = new WebSocket(wsUrl)
      }

      if (socket) {

        socket.onopen = () => {
          console.log('Соединение установлено')
          dispatch(wsSuccess())
        }

        socket.onmessage = evt => {
          const { data } = evt
          const { success, ...parsedData } = JSON.parse(data)
          if (success) dispatch(getFeedData(parsedData))
          console.log('Данные получены')
        }

        socket.onerror = () => {
          dispatch(wsError())
        }

        socket.onclose = () => dispatch(wsClose())
      }

      next(action)
    }
  }
}