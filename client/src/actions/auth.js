import { AUTH, RESET_USER, LOGOUT } from "../constants";
import * as api from "../api";

export const signin = (userData, router) => async (dispatch) => {
    try {
        const { data } = await api.signin(userData);
        dispatch({ type: AUTH, payload: data });
        router.push("/");
    } catch (error) {
        router.push("/signin?error=" + error.response.data.message);
    }
}

export const googleSignin = (userData, router) => async (dispatch) => {
    try {
        const { data } = await api.googleSignin(userData);
        dispatch({ type: AUTH, payload: data });
        router.push("/");
    } catch (error) {
        router.push("/signin?error=" + error.response.data.message);
    }
}

export const signup = (userData, router) => async (dispatch) => {
    try {
        const { data } = await api.signup(userData);
        dispatch({ type: AUTH, payload: data });
        router.push("/");
    } catch (error) {
        router.push("/signup?error=" + error.response.data.message);
    }
}

export const signout = (router) => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT })
        dispatch({ type: RESET_USER })
        router.push("/auth");
    } catch (e) {
        console.log(e);
    }
}