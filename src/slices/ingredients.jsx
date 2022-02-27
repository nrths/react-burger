import { createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../utils/data';

export const initialState = {
    loading: false,
    hasError: false,
    ingredients: [],
    //total: 0,
    ingredientDetails: null,
    ingredientDetailsModal: false,
    
    bun: {},
    selectedIngredients: [],
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
        },
        removeIngredientDetails: state => {
            state.ingredientDetails = null
            state.ingredientDetailsModal = false
        },
        // addIngredientInConstructorItem: (state, { payload }) => {
        //     state.selectedIngredients = [...payload, payload.find(item => item._id === payload.id)]
        // },
        // deleteIngredientInConstructorItem: (state, { payload }) => {
        //     state.selectedIngredients = [...state.selectedIngredients, state.selectedIngredients.filter(item => item._id === payload.id)]
        // }
    },
})


export const { 
    getIngredients, 
    getIngredientsSuccess, 
    getIngredientsFailed, 
    showIngredientDetails, 
    removeIngredientDetails } = ingredientsSlice.actions

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