import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
    const userData = useSelector(state => state.userData);

    return (
        <div className="navbar">
            <div>
                <h1>YouShare</h1>
            </div>
            <div id="links">
                <div className="navitem">
                    <Link to="/">Feed</Link>
                </div>
                <span className="divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <div className="navitem">
                    <Link to="/post">Create Post</Link>
                </div>
                <span className="divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <div className="navitem">
                    <Link to="/signout">Signout</Link>
                </div>
            </div>
            <div>
                <div className="user-pic" >
                    <img src={userData.image} alt=""></img>
                </div>
                <p className="username">
                    {userData.name}
                </p>
            </div>
        </div>
    )
}

export default Navbar;