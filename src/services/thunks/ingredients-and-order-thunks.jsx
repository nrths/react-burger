import { baseUrl, checkResponse } from '../../utils/data';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async (ingredients, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}/ingredients`)
            const data = await checkResponse(response)
            return data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const fetchOrderDetails = createAsyncThunk(
    'ingredients/fetchOrderDetails',
    async (ingredients, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}/orders`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredients: ingredients.map(i => i._id) })
            })
            const data = await checkResponse(response)
            return data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)