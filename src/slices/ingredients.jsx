import { createSlice, nanoid } from '@reduxjs/toolkit';
import { baseUrl } from '../utils/data';

export const initialState = {
    loading: false,
    hasError: false,
    ingredients: [],
    ingredientDetails: null,
    ingredientDetailsModal: false,

    constructor: {
        burger: [],
        // total: 0,
    },
    orderNumber: 0,
    orderName: '',
    orderDetailsModal: false
}

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        getIngredients: state => {
            state.loading = true;
        },
        getIngredientsSuccess: (state, { payload }) => {
            state.ingredients = payload
            state.loading = false
            state.hasError = false
        },
        getIngredientsFailed: state => {
            state.loading = false
            state.hasError = true
        },
        showIngredientDetails: (state, { payload }) => {
            state.ingredientDetails = payload
            state.ingredientDetailsModal = true
            console.log(payload)
        },
        removeIngredientDetails: state => {
            state.ingredientDetails = null
            state.ingredientDetailsModal = false
        },
        addIngredientInConstructorItem: {
            reducer: (state, { payload }) => {
                state.constructor.burger = [...state.constructor.burger, payload]
                console.log(payload)
            },
            prepare: item => {
                const uniqueID = nanoid()
                return { payload: { ...item, uniqueID } }
            }
        },
        deleteIngredientFromConstructorItem: (state, { payload }) => {
            state.constructor.burger = [...state.constructor.burger].filter(item => item.uniqueID !== payload.uniqueID)
        },
        changeBunInConstructor: (state, { payload }) => {
            state.constructor.burger = state.constructor.burger.map(item => item._id !== payload._id ? payload : item)
        },
        dragItems: (state, { payload }) => {

        },
        getOrder: state => {
            state.loading = true;
        },
        getOrderSuccess: (state, { payload }) => {
            state.loading = false
            state.hasError = false
            state.orderNumber = payload.order.number
            state.orderName = payload.name
            state.orderDetailsModal = true
        },
        getOrderFailed: state => {
            state.loading = false
            state.hasError = true
            state.orderNumber = 0
            state.orderName = 'Ой, не начали :('
            state.orderDetailsModal = true
        },
        closeOrderDetailsModal: state => {
            state.orderDetailsModal = false
        }
    },
})

export const {
    getIngredients,
    getIngredientsSuccess,
    getIngredientsFailed,
    showIngredientDetails,
    removeIngredientDetails,
    addIngredientInConstructorItem,
    deleteIngredientFromConstructorItem,
    changeBunInConstructor,
    getOrder, getOrderFailed, getOrderSuccess, closeOrderDetailsModal } = ingredientsSlice.actions

export const ingredientsSelector = state => state.ingredients

export default ingredientsSlice.reducer

export function fetchIngredients() {
    return async dispatch => {
        dispatch(getIngredients())

        try {
            const response = await fetch(`${baseUrl}/ingredients`)
            const data = await response.json()

            dispatch(getIngredientsSuccess(data.data))

        } catch (err) {
            dispatch(getIngredientsFailed())
        }
    }
}

export function fetchOrderDetails(ingredients) {
    return async dispatch => {
        dispatch(getOrder())

        try {
            const response = await fetch(`${baseUrl}/orders`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ ingredients: ingredients.map(i => i._id) })
            })
            const data = await response.json()

            dispatch(getOrderSuccess(data))
        } catch (err) {
            dispatch(getOrderFailed())
        }
    }
}
