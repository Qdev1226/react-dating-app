import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: {},
    loading: false,
    logoutLoading: false,
    userLoading: true,
    isAuthenticated: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userRequest: (state) => {
            state.loading = true
        },
        getUserRequest: (state) => {
            state.userLoading = true
        },
        logoutRequest: (state) => {
            state.logoutLoading = true
        },
        userSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        getUserSuccess: (state, action) => {
            state.userLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        logoutSuccess: (state) => {
            state.logoutLoading = false;
            state.isAuthenticated = false
        },
        userFailed: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload
        },
        getUserFailed: (state, action) => {
            state.userLoading = false;
            state.isAuthenticated = false;
            state.error = action.payload
        },
        logoutFailed: (state, action) => {
            state.logoutLoading = false;
            state.error = action.payload
        },
        clearErrors: (state) => {
            state.error = null
        }
    }
})

export const {
    userRequest,
    getUserRequest,
    logoutRequest,
    userSuccess,
    getUserSuccess,
    logoutSuccess,
    userFailed,
    getUserFailed,
    logoutFailed,
    clearErrors
} = userSlice.actions

export default userSlice.reducer