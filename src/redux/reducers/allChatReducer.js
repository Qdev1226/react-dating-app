import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    allChat: [],
    error: null
}

const allChatSlice = createSlice({
    name: "allChat",
    initialState,
    reducers: {
        allChatRequest: (state) => {
            state.loading = true
        },
        allChatSuccess: (state, action) => {
            state.loading = false;
            state.allChat = action.payload.messages
        },
        allChatFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        clearErrors: (state) => {
            state.error = null
        }
    }
})

export const {
    allChatRequest,
    allChatSuccess,
    allChatFailed,
    clearErrors
} = allChatSlice.actions

export default allChatSlice.reducer