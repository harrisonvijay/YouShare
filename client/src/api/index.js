import axios from "axios";

const API = axios.create({ baseURL: "https://youshare-api.herokuapp.com/" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("auth")) {
        const storedToken = JSON.parse(localStorage.getItem("auth"));
        const token = storedToken.substr(1, storedToken.length - 2);
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const signin = (userData) => API.post("/auth/signin", userData);
export const signup = (userData) => API.post("/auth/signup", userData);
export const googleSignin = (userData) => API.post("/auth/signin/google", userData);

export const createPost = (postData) => API.post("/posts/", postData);
export const getPosts = () => API.get("/posts/");
export const updatePost = (postData) => API.patch("/posts/" + postData.postId, postData);
export const deletePost = (postId) => API.delete("/posts/" + postId);
export const likePost = (postId) => API.post("/posts/" + postId + "/like");

export const getUser = () => API.get("/user");