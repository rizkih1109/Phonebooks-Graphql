import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../App'
import { GET_USERS } from '../../graphql/gql'

const initialState = { value: [], status: 'idle', keyword: '', sortBy: '_id', sortMode: 'asc', page: 1, limit: 30 }

export const loadPhoneAsync = createAsyncThunk(
    'phonebooks/load',
    async ({ page = 1, keyword = '', sortBy = '_id', sortMode = 'asc', limit = 30 }) => {
        const response = await client.query({
            query: GET_USERS,
            variables: { page, keyword, sortBy, sortMode }
        })
        return { data: response.data, keyword, page, limit, sortBy, sortMode }
    })

export const phoneSlice = createSlice({
    name: 'phone',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadPhoneAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(loadPhoneAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.page === 1) {
                    state.value = action.payload.data.getUsers.phonebooks
                    state.page = 1
                } else {
                    state.value = [...state.value, ...action.payload.data.getUsers.phonebooks];
                }
            })
            .addCase(loadPhoneAsync.rejected, (state, action) => {
                state.status = 'idle'
                state.value = []
            })
    }
})

export default phoneSlice.reducer;