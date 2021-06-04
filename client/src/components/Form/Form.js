import "./Form.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useHistory, useLocation } from "react-router-dom";
import ImageInputBase64 from "../ImageInputBase64/ImageInputBase64";
import decode from "jwt-decode";

const Form = () => {

    // custom hook
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const postId = query.get("postId");
    const post = useSelector(state => state.posts.filter((post) => post.postId === postId)[0]);
    const [formData, setFormData] = useState({ type: "text", content: "", image: null, caption: "" });

    useEffect(() => {
        if (post) {
            setFormData({ postId: post.postId, type: post.type, content: post.content ? post.content : "", image: post.image ? post.image : null, caption: post.caption ? post.caption : "" });
        }
    }, [post, setFormData])



    if (postId && !post) {
        return <p className="center-msg">Invalid Post ID</p>;
    }

    if (post) {
        const authObj = localStorage.getItem("auth");
        const userData = decode(authObj);
        if (post.userId !== userData.id) {
            return <p className="center-msg">Access Denied</p>;
        }
    }


    const submitHandler = (e) => {
        e.preventDefault();
        var postData;
        if (formData.type === "text") {
            postData = { type: formData.type, content: formData.content };
        } else {
            postData = { type: formData.type, image: formData.image, caption: formData.caption };
        }
        if (formData.postId) {
            dispatch(updatePost({ ...postData, postId: formData.postId }));
        } else {
            dispatch(createPost(postData));
        }
        history.push("/");
    }

    return (
        <div className="create-post-form">
            <h1>{postId ? "Edit Post" : "Create Post"}</h1>
            <form onSubmit={submitHandler}>
                <select defaultValue={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value, content: "", image: null })}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                </select> <br />
                {formData.type === "text" ? (
                    <>
                        <textarea
                            name="content"
                            placeholder="Enter Text"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows={2}
                            maxLength={280}
                        ></textarea><br />
                    </>
                ) : (
                    <>
                        {formData.image && <img className="chosen-img" src={formData.image} alt=""></img>}
                        <br />
                        <ImageInputBase64
                            pickerText="Choose Image"
                            name="image"
                            onDone={(image) => setFormData({ ...formData, image: image })}
                        /><br />
                        <textarea
                            name="caption"
                            placeholder="Enter Caption"
                            value={formData.caption}
                            onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                            rows={2}
                            maxLength={80}
                        ></textarea><br />
                    </>
                )
                }

                <button type="submit" disabled={!(formData.image !== null || formData.content !== "")}>Post</button>
            </form >
        </div>
    )
}

export default Form;