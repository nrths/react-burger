import { wsInit, wsClose, wsError, wsSuccess } from '../slices/web-socket';
import { getFeedData } from '../slices/feed';
// import { wsUrl } from '../../utils/constants'

export const socketMiddleware = () => {
  return store => {
    let socket = null;

    return next => action => {

      const { dispatch } = store
      const { type, payload } = action

      if (type === wsInit.type) {
        // console.log()
        const wsUrl = payload.url ? `${payload.url}` : null 
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

        socket.onerror = evt => {
          dispatch(wsError())
          console.log(evt)
        }

        socket.onclose = () => dispatch(wsClose())
      }

      next(action)
    }
  }
}