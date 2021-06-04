import { CREATE_POST, DELETE_POST, GET_ALL_POSTS, UPDATE_POST } from "../constants";
import * as api from "../api";

export const createPost = (postData) => async (dispatch) => {
    try {
        const { data } = await api.createPost(postData);
        dispatch({ type: CREATE_POST, payload: data });
    } catch (error) {
        console.log(error.response.data.message);
    }
}

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.getPosts();
        dispatch({ type: GET_ALL_POSTS, payload: data });
    } catch (error) {
        console.log(error.response.data.message);
    }
}

export const updatePost = (postData) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(postData);
        dispatch({ type: UPDATE_POST, payload: data });
    } catch (error) {
        console.log(error.response.data.message);
    }
}

export const deletePost = (postId) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(postId);
        dispatch({ type: DELETE_POST, payload: data });
    } catch (error) {
        console.log(error.response.data.message);
    }
}

export const likePost = (postId) => async (dispatch) => {
    try {
        const { data } = await api.likePost(postId);
        dispatch({ type: UPDATE_POST, payload: data });
    } catch (error) {
        console.log(error.response.data.message);
    }
}