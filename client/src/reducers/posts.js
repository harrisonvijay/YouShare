import { CREATE_POST, GET_ALL_POSTS, UPDATE_POST, DELETE_POST } from "../constants";

const postsReducer = (state = [], action) => {
    switch (action.type) {
        case CREATE_POST:
            return [...state, action.payload];
        case GET_ALL_POSTS:
            return action.payload;
        case UPDATE_POST:
            return state.map((post) => post.postId === action.payload.postId ? action.payload : post);
        case DELETE_POST:
            return state.filter((post) => post.postId !== action.payload.postId);
        default:
            return state;
    }
}

export default postsReducer;
