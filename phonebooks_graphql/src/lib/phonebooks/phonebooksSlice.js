import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../App'
import { ADD_USER, DELETE_USER, GET_USERS, UPDATE_USER } from '../../graphql/gql'

const initialState = { value: [], status: 'idle', keyword: '', sortBy: '_id', sortMode: 'asc', page: 1, limit: 30 }

export const loadPhoneAsync = createAsyncThunk(
    'phonebooks/load',
    async ({ page = 1, keyword = '', sortBy = '_id', sortMode = 'asc', limit = 30 }) => {
        const response = await client.query({
            query: GET_USERS,
            variables: { page, keyword, sortBy, sortMode }
        })
        return { data: response.data, keyword, page, limit, sortBy, sortMode }
    }
)

export const addPhoneAsync = createAsyncThunk(
    'phonebooks/add',
    async ({ name, phone }) => {
        const response = await client.mutate({
            mutation: ADD_USER,
            variables: { input: { name, phone } }
        })
        return response.data
    }
)

export const updatePhoneAsync = createAsyncThunk(
    'phonebooks/update',
    async ({ id, name, phone }) => {
        console.log('coba')
        const response = await client.mutate({
            mutation: UPDATE_USER,
            variables: { id, input: { name, phone } }
        })
        console.log('data', response.data)
        return { id, data: response.data }
    }
)

export const removePhoneAsync = createAsyncThunk(
    'phonebooks/remove',
    async ({ id }) => {
        const response = await client.mutate({
            mutation: DELETE_USER,
            variables: { id }
        })
        return response.data
    }
)

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
            .addCase(addPhoneAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(addPhoneAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = [action.payload.createUser, ...state.value]
            })
            .addCase(updatePhoneAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(updatePhoneAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                console.log('reducer', action.payload)
                state.value = state.value.map(item => {
                    if (item._id === action.payload.id) {
                       return {
                        ...item,
                        name: action.payload.data.updateUser.name,
                        phone: action.payload.data.updateUser.phone
                       }
                    }
                    return item
                })
            })
            .addCase(updatePhoneAsync.rejected, (state, action) => {
                state.status = 'idle'
                console.error('Failed to add user:', action.error.message);
            })
            .addCase(removePhoneAsync.pending, state => {
                state.status = 'loading'
            })
            .addCase(removePhoneAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = state.value.filter(item => item._id !== action.payload.deleteUser._id)
            })
            .addCase(removePhoneAsync.rejected, (state, action) => {
                state.status = 'idle'
                console.error('Failed to remove user:', action.error.message);
            })
    }
})

export default phoneSlice.reducer;