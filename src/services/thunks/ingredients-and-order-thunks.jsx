import { baseUrl, checkResponse } from '../../utils/data';
import { getIngredients, getIngredientsSuccess, getIngredientsFailed,
         getOrder, getOrderSuccess, getOrderFailed } from '../slices/ingredients';

export const fetchIngredients = () => {
    return async dispatch => {
        dispatch(getIngredients())

        try {
            const response = await fetch(`${baseUrl}/ingredients`)
            const data = await checkResponse(response)

            dispatch(getIngredientsSuccess(data.data))

        } catch (err) {
            dispatch(getIngredientsFailed())
        }
    }
}

export const fetchOrderDetails = (ingredients) => {
    return async dispatch => {
        dispatch(getOrder())

        try {
            const response = await fetch(`${baseUrl}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredients: ingredients.map(i => i._id) })
            })
            const data = await checkResponse(response)

            dispatch(getOrderSuccess(data))
        } catch (err) {
            dispatch(getOrderFailed())
        }
    }
}
