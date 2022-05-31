import { checkResponse } from '../../utils/check-funcs';
import { baseUrl } from '../../utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookies';
import { TIngredient } from '../types/types';

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async (ingredients, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}/ingredients`)
            const data = await checkResponse(response)
            return data
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
)

export const fetchOrderDetails = createAsyncThunk(
    'ingredients/fetchOrderDetails',
    async (ingredients: TIngredient[], { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `${getCookie('accessToken')}`
                },
                body: JSON.stringify({ ingredients: ingredients.map(i => i._id) })
            })
            const data = await checkResponse(response)
            return data
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
)