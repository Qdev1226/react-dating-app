import axios from "axios";

import { getUserFailed, getUserRequest, getUserSuccess, logoutFailed, logoutRequest, logoutSuccess, userFailed, userRequest, userSuccess } from "../reducers/userReducer";

const url = import.meta.env.VITE_BASE_URL

// 1. New User
export const signup = (formData) => async (dispatch) => {
    dispatch(userRequest());

    try {
        const { data } = await axios.post(
            `${url}/api/user/signup`, formData
        );

        dispatch(userSuccess(data));
    } catch (error) {
        dispatch(
            userFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 2. User login
export const login = (formData) => async (dispatch) => {
    dispatch(userRequest());

    try {
        const { data } = await axios.post(
            `${url}/api/user/login`, formData
        );

        dispatch(userSuccess(data));
    } catch (error) {
        dispatch(
            userFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};

// 3. Get user details
export const getUserDetails = () => async (dispatch) => {
    dispatch(getUserRequest());

    try {
        const { data } = await axios.get(
            `${url}/api/user/me`
        );

        dispatch(getUserSuccess(data));
    } catch (error) {
        dispatch(
            getUserFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};
// 4. Logout user
export const logout = () => async (dispatch) => {
    dispatch(logoutRequest());

    try {
        const { data } = await axios.get(
            `${url}/api/user/logout`
        );

        dispatch(logoutSuccess(data));
    } catch (error) {
        dispatch(
            logoutFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};