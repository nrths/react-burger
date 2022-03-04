// import { createSlice } from '@reduxjs/toolkit';
// import { baseUrl } from '../utils/data';

// const orderInitialState = {
//     loading: false,
//     hasError: false,
//     data: null,
// }

// const orderSlice = createSlice({
//     name: 'order',
//     orderInitialState,
//     reducers: {
//         getOrder: state => {
//             state.loading = true;
//         },
//         getOrderSuccess: (state, { payload }) => {
//             state.data = payload.data
//             state.loading = false
//             state.hasError = false
//         },
//         getOrderFailed: state => {
//             state.loading = false
//             state.hasError = true
//         },
//     },
// })

// export const { getOrder, getOrderSuccess, getOrderFailed } = orderSlice.actions

// export const orderSelector = state => state.ingredients

// export default orderSlice.reducer

// export function fetchOrderDetails() {
//     return async dispatch => {
//         dispatch(getOrder())

//         try {
//             const response = await fetch(`${baseUrl}/orders`, {
//                 method: 'POST',
//                 headers: {'Content-Type': 'application/json'},
//                 body: JSON.stringify({ ingredients:  })
//             })
//             const data = await response.json()

//             dispatch(getOrderSuccess(data))
//         } catch (err) {
//             dispatch(getOrderFailed())
//         }
//     }
// }