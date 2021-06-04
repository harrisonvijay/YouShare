import "./LoadScreen.css";
import Loader from "react-loader-spinner";

const LoadScreen = (props) => {
    return (
        <div className="loader">
            {props.title && <h1>{props.title}</h1>}
            <Loader
                color="#c33124"
                type="TailSpin"
                height={80}
                width={80}
            />
        </div>
    );
}

export default LoadScreen;