import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    messages: [],
    error: null
}

const twoMessagesSlice = createSlice({
    name: "twoMessages",
    initialState,
    reducers: {
        twoMessagesRequest: (state) => {
            state.loading = true
        },
        twoMessagesSuccess: (state, action) => {
            state.loading = false;
            state.messages = action.payload.messages
        },
        twoMessagesFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        clearErrors: (state) => {
            state.error = null
        }
    }
})

export const {
    twoMessagesRequest,
    twoMessagesSuccess,
    twoMessagesFailed,
    clearErrors
} = twoMessagesSlice.actions

export default twoMessagesSlice.reducer