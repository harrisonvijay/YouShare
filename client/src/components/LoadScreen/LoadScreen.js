import "./LoadScreen.css";
import Loader from "react-loader-spinner";

const LoadScreen = (props) => {
    try {
        document.getElementsByClassName("navbar")[0].style.display = "none";
    } catch { }

    return (
        <div className="loader">
            {props.title && <h1>{props.title}</h1>}
            <Loader
                color="#c33124"
                type="TailSpin"
                height={70}
                width={70}
            />
        </div>
    );
}

export default LoadScreen;