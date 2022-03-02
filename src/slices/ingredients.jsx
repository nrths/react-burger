import { createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../utils/data';

export const initialState = {
    loading: false,
    hasError: false,
    ingredients: [],
    ingredientDetails: null,
    ingredientDetailsModal: false,

    constructor: {
        burger: [],
        total: 0,
    }
    // selectedIngredients: [],
    // selectedBun: {},
    // counter: {},
    // orderNumber: 0,
    // orderName: '',
    // orderDetails: false
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
        addIngredientInConstructorItem: (state, { payload }) => {
            state.constructor.burger = [...state.constructor.burger, payload]
            console.log(payload)

        },
        deleteIngredientFromConstructorItem: (state, { payload }) => {
            state.constructor.burger = [...state.constructor.burger, state.constructor.burger.filter((item, index) => index !== payload.index)]
        },
        changeBunInConstructor: (state, { payload }) => {
            state.constructor.burger = state.constructor.burger.map(item => item._id !== payload._id ? payload : item)
        },
        dragItems: (state, { payload }) => {

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
    changeBunInConstructor } = ingredientsSlice.actions

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