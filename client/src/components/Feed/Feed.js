import "./Feed.css"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Post from "../Post/Post";

const Feed = () => {
    const posts = useSelector(state => state.posts);

    return (
        <div className="feed">
            {posts.length > 0 ?
                (posts.map((post, idx) => <Post post={post} key={idx} />).reverse())
                :
                (<p className="center-msg empty-feed">No Posts. Click <Link to="/post">here</Link> to create a new post.</p>)
            }
        </div>
    );
}

export default Feed;