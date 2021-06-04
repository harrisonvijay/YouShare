import { useHistory } from "react-router-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Form from "../Form/Form";
import Feed from "../Feed/Feed";
import { signout } from "../../actions/auth";
import { getPosts } from "../../actions/posts";
import { getUser } from "../../actions/user";
import LoadScreen from "../LoadScreen/LoadScreen";

const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    // redirect to /signin if not authorized
    const authObj = localStorage.getItem("auth");
    if (!authObj) {
        history.push("/signin");
        return <></>;
    }

    dispatch(getPosts());
    dispatch(getUser());

    const Logout = () => {
        setTimeout(() => dispatch(signout(history)), 500);
        return (
            <LoadScreen title="Signing out" />
        );
    }

    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Feed} />
                    <Route path="/post" exact component={Form} />
                    <Route path="/signout" exact component={Logout} />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default Home;