import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: null
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        newMessageRequest: (state) => {
            state.loading = true
        },
        newMessageSuccess: (state, action) => {
            state.loading = false;
            state.messageCreated = action.payload.success
        },
        newMessageFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        clearErrors: (state) => {
            state.error = null
        }
    }
})

export const {
    newMessageRequest,
    newMessageSuccess,
    newMessageFailed,
    clearErrors
} = messageSlice.actions

export default messageSlice.reducer