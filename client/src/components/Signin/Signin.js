import "./Signin.css";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin, googleSignin } from "../../actions/auth";
import { GoogleLogin } from "react-google-login";
import { useEffect, useState } from "react";
import LoadScreen from "../LoadScreen/LoadScreen";

const Signin = () => {
    const [errorText, setErrorText] = useState(null);
    const [load, setLoad] = useState(false);

    // custom hook
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const history = useHistory();
    const authObj = localStorage.getItem("auth");

    if (authObj) {
        history.replace("/");
    }

    const dispatch = useDispatch();

    const signinSubmitHandler = (e) => {
        e.preventDefault();
        setLoad(true);
        const userData = {
            email: e.target.email.value,
            password: e.target.password.value
        };
        dispatch(signin(userData, history));
    }

    const googleSuccessHandler = (res) => {
        setLoad(true);
        dispatch(googleSignin(res, history));
    }

    const googleFailureHandler = (res) => {
        console.log(res);
    }

    const error = query.get("error");
    useEffect(() => {
        if (error) {
            setLoad(false);
            setErrorText(error);
        }
    }, [error])


    return (
        <div className="auth-container">
            {!load && (
                <div className="auth">
                    <h1>YouShare</h1>
                    <form onSubmit={signinSubmitHandler}>
                        <input name="email" type="email" placeholder="Enter your email address" required></input><br />
                        <input name="password" type="password" placeholder="Enter your password" required></input><br />
                        <button type="submit">Signin</button>
                    </form>
                    <GoogleLogin
                        clientId="277006415026-sl7h3bqevsch34aa6fro6rcroo6urlan.apps.googleusercontent.com"
                        onSuccess={googleSuccessHandler}
                        onFailure={googleFailureHandler}
                        cookiePolicy="single_host_origin"
                    >
                        Signin with Google
                    </GoogleLogin><br />
                    <p>Don't have an account? <Link to="/signup">Click here</Link></p>

                    {errorText && <p className="error">{errorText}</p>}
                </div>
            )}
            {load && <LoadScreen title="Signing in" />}
        </div>);
}

export default Signin;