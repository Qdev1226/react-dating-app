import axios from "axios";
import { allUsersFailed, allUsersRequest, allUsersSuccess } from "../reducers/usersReducer";

const url = import.meta.env.VITE_BASE_URL

// 1. New Message
export const getAllUsers = () => async (dispatch) => {
    dispatch(allUsersRequest());

    try {
        const { data } = await axios.get(
            `${url}/api/user/all`
        );

        dispatch(allUsersSuccess(data));
    } catch (error) {
        dispatch(
            allUsersFailed(
                error?.response?.data.message ||
                error.message ||
                "Something went wrong !"
            )
        );
    }
};