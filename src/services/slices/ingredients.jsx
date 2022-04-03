import { createSlice, nanoid } from '@reduxjs/toolkit';
import { fetchIngredients, fetchOrderDetails } from '../thunks/ingredients-and-order-thunks';


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
    orderDetailsModal: false,
}

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
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
        closeOrderDetailsModal: state => {
            state.orderDetailsModal = false
            state.constructor.burger = []
            state.orderNumber = 0
            state.orderName = ''
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchIngredients.pending, state => { state.loading = true })
            .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
                state.ingredients = payload.data
                // localStorage.setItem('storageIngredients', JSON.stringify(payload.data))
                
                //console.log(localStorage)
                state.loading = false
                state.hasError = false
            })
            .addCase(fetchIngredients.rejected, state => {
                state.loading = false
                state.hasError = true
            })
            .addCase(fetchOrderDetails.pending, state => { state.loading = true })
            .addCase(fetchOrderDetails.fulfilled, (state, { payload }) => {
                state.loading = false
                state.orderNumber = payload.order.number
                state.orderName = payload.name
                state.orderDetailsModal = true
            })
            .addCase(fetchOrderDetails.rejected, state => {
                state.orderNumber = 0
                state.orderName = 'Ой, не начали :('
                state.orderDetailsModal = true
            })
            .addDefaultCase(() => {})
    }
})

export const {
    showIngredientDetails,
    removeIngredientDetails,
    addIngredientInConstructorItem,
    deleteIngredientFromConstructorItem,
    clearConstructor,
    closeOrderDetailsModal, dragItems
} = ingredientsSlice.actions

export const ingredientsSelector = state => state.ingredients

export default ingredientsSlice.reducer