import "../Signin/Signin.css";
import { useHistory, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../actions/auth";
import { useEffect, useState } from "react";
import ImageInputBase64 from "../ImageInputBase64/ImageInputBase64";
import LoadScreen from "../LoadScreen/LoadScreen";

const Signup = () => {
    const [errorText, setErrorText] = useState(null);
    const [load, setLoad] = useState(false);

    // custom hook
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();

    const [image, setImage] = useState("");
    const history = useHistory();
    const authObj = localStorage.getItem("auth");

    if (authObj) {
        history.replace("/");
    }

    const dispatch = useDispatch();

    const signupSubmitHandler = (e) => {
        e.preventDefault();
        setLoad(true);
        const userData = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            image: image
        };
        dispatch(signup(userData, history));
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
                    <form onSubmit={signupSubmitHandler}>
                        <input name="name" type="text" placeholder="Enter your name" required></input><br />
                        <input name="email" type="email" placeholder="Enter your email address" required></input><br />
                        <input name="password" type="password" placeholder="Enter your password" required></input><br />
                        <ImageInputBase64
                            pickerText="Choose Profile Picture"
                            name="image"
                            onDone={(base64) => setImage(base64)}
                        /><br />
                        <button type="submit">Signup</button>
                    </form>
                    <p>Already have an account? <Link to="/signin">Click here</Link></p>

                    {errorText && <p className="error">{errorText}</p>}
                </div>
            )}
            {load && <LoadScreen title="Signing up" />}
        </div>);
}

export default Signup;