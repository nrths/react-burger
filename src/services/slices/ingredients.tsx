import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { fetchIngredients, fetchOrderDetails } from '../thunks/ingredients-and-order-thunks';
import { TIngredient } from '../types/types';
import { TRootState } from '../index';

type TIngredientsState = {
    loading: boolean,
    hasError: boolean,
    ingredients: Array<TIngredient>,
    ingredientDetails: [] | null,
    ingredientDetailsModal: boolean,

    burger: Array<TIngredient>,
    
    orderNumber: number,
    orderName: string,
    orderDetailsModal: boolean,
}

export const initialState: TIngredientsState = {
    loading: false,
    hasError: false,
    ingredients: [],
    ingredientDetails: null,
    ingredientDetailsModal: false,

    burger: [],
    
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
            reducer: (state, { payload }: PayloadAction<TIngredient>) => {
                if (payload.type === 'bun') {
                    state.burger = [...state.burger, payload]
                    state.burger = [...state.burger, payload]
                }
                else state.burger = [...state.burger, payload]
            },
            // prepare requires a specific type of payload
            prepare: item => {
                const uniqueID = nanoid()
                return { payload: { ...item, uniqueID } }
            }
        },
        deleteIngredientFromConstructorItem: (state, { payload }) => {
            if (payload.type === 'bun') {
                state.burger = state.burger.filter(item => item.type !== 'bun')
            } else {
                state.burger = [...state.burger].filter(item => item.uniqueID !== payload.uniqueID)
            }
        },
        dragItems: (state, { payload }) => {
            const draggableIngredients = state.burger.filter(item => item.type !== 'bun')
            const nonDraggableIngredients = state.burger.filter(item => item.type === 'bun')
            draggableIngredients[payload.dragIndex] = draggableIngredients.splice(payload.hoverIndex, 1, draggableIngredients[payload.dragIndex])[0]
            state.burger = draggableIngredients.concat(nonDraggableIngredients)
        },
        closeOrderDetailsModal: state => {
            state.orderDetailsModal = false
            state.burger = []
            state.orderNumber = 0
            state.orderName = ''
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchIngredients.pending, state => { state.loading = true })
            .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
                state.ingredients = payload.data
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
                state.loading = false
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
    closeOrderDetailsModal, dragItems
} = ingredientsSlice.actions

export const ingredientsSelector = (state: TRootState) => state.ingredients

export default ingredientsSlice.reducer