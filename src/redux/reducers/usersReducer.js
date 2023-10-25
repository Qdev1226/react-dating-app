import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    users: [],
    loading: false,
    error: null
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        allUsersRequest: (state) => {
            state.loading = true
        },
        allUsersSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
        },
        allUsersFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        clearErrors: (state) => {
            state.error = null
        }
    }
})

export const {
    allUsersRequest,
    allUsersSuccess,
    allUsersFailed,
    clearErrors
} = usersSlice.actions

export default usersSlice.reducer