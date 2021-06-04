import { GET_USER } from "../constants";
import * as api from "../api";

export const getUser = () => async (dispatch) => {
    try {
        const { data } = await api.getUser();
        dispatch({ type: GET_USER, payload: data });
    } catch (error) {
        console.log(error.response.data.message);
    }
}