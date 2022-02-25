import { createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../utils/data';

export const initialState = {
    loading: false,
    hasError: false,
    selectedIngredients: [],
    total: 0
}

const orderSlice = createSlice({
    name: 'selectedIngredients',
    initialState,
    reducers: {
        getSelectedIngredients: state => {
            state.loading = true;
        },
        getSelectedIngredientsSuccess: (state, { payload }) => {
            state.selectedIngredients = payload
            state.loading = false
            state.hasError = false
        },
        getSelectedIngredientsFailed: state => {
            state.loading = false
            state.hasError = true
        },
    },
})

export const { getSelectedIngredients, getSelectedIngredientsSuccess, getSelectedIngredientsFailed } = orderSlice.actions

export const orderSelector = state => state.selectedIngredients

export default orderSlice.reducer

// export function fetchOrderDetails() {
//     return async dispatch => {
//         dispatch(getSelectedIngredients())

//         try {
//             const response = await fetch(`${baseUrl}/orders`, {
//                 method: 'POST',
//                 headers: {'Content-Type': 'application/json'},
//                 body: JSON.stringify({ selectedIngredients: selectedIngredients.map(item => item._id) })
//             })
//             const data = await response.json()

//             dispatch(getSelectedIngredientsSuccess(data))
//         } catch (err) {
//             dispatch(getSelectedIngredientsFailed())
//         }
//     }
// }