import "./Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as heartSolid, faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartOutline } from "@fortawesome/free-regular-svg-icons";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../actions/posts";
import { confirmAlert } from "react-confirm-alert";
import { useHistory } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Post = ({ post }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // decode token to get user ID, name and email
    const authObj = localStorage.getItem("auth");
    const userData = decode(authObj);

    const timeString = dayjs(post.createdAt).fromNow();

    const deleteClickHandler = () => {
        confirmAlert({
            title: "Are you sure?",
            message: "Click 'Yes' to delete this post",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => dispatch(deletePost(post.postId))
                },
                {
                    label: "No",
                    onClick: () => { }
                }
            ]
        })
    }

    const editClickHandler = () => {
        history.push("/post?postId=" + post.postId);
    }

    return (
        <div className="post">
            <div className="post-header">
                <span className="post-username">{post.userName}</span>
                <span className="post-time">{timeString}</span>
            </div>
            <div className="post-content">
                {post.type === "text" ?
                    <p>{post.content}</p> :
                    (
                        <>
                            <img className="post-img" src={post.image} alt="" /><br />
                            <p>{post.caption}</p>
                        </>
                    )
                }
            </div>
            <div className="btn-section">
                <div className="like-section">
                    <button onClick={() => dispatch(likePost(post.postId))}>
                        {post.likes.find((userId) => (userId === userData.id)) ? <FontAwesomeIcon icon={heartSolid} /> : <FontAwesomeIcon icon={heartOutline} />}
                    </button>
                    <span>{post.likes.length > 0 && post.likes.length}</span>
                </div>
                {post.userId === userData.id && (
                    <button className="special-btn" onClick={editClickHandler}>
                        <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                )}
                {post.userId === userData.id && (
                    <button className="special-btn" onClick={deleteClickHandler}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default Post;