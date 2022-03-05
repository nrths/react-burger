import { createSlice, nanoid } from '@reduxjs/toolkit';


export const initialState = {
    loading: false,
    hasError: false,
    ingredients: [],
    ingredientDetails: null,
    ingredientDetailsModal: false,

    constructor: {
        burger: [],
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
            },
            prepare: item => {
                const uniqueID = nanoid()
                return { payload: { ...item, uniqueID } }
            }
        },
        deleteIngredientFromConstructorItem: (state, { payload }) => {
            if (payload.type === 'bun') {
                state.constructor.burger = state.constructor.burger.filter(item => item.type !== 'bun')
            } else {
                state.constructor.burger = [...state.constructor.burger].filter(item => item.uniqueID !== payload.uniqueID)
            }
        },
        dragItems: (state, { payload }) => {
            const draggableIngredients = state.constructor.burger.filter(item => item.type !== 'bun')
            const nonDraggableIngredients = state.constructor.burger.filter(item => item.type === 'bun')
            draggableIngredients[payload.dragIndex] = draggableIngredients.splice(payload.hoverIndex, 1, draggableIngredients[payload.dragIndex])[0]
            state.constructor.burger = draggableIngredients.concat(nonDraggableIngredients)
        },
        getOrder: state => {
            state.loading = true;
        },
        getOrderSuccess: (state, { payload }) => {
            state.loading = false
            state.orderNumber = payload.order.number
            state.orderName = payload.name
            state.orderDetailsModal = true
        },
        getOrderFailed: state => {
            state.orderNumber = 0
            state.orderName = 'Ой, не начали :('
            state.orderDetailsModal = true
        },
        closeOrderDetailsModal: state => {
            state.orderDetailsModal = false
            state.constructor.burger = []
            state.orderNumber = 0
            state.orderName = ''
        },
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
    clearConstructor,
    getOrder, getOrderFailed, getOrderSuccess, closeOrderDetailsModal, dragItems } = ingredientsSlice.actions

export const ingredientsSelector = state => state.ingredients

export default ingredientsSlice.reducer