import { useState } from "react";
import "./ImageInputBase64.css";

const ImageInputBase64 = (props) => {

    const [fileName, setFileName] = useState("No file chosen");

    const toBase64 = (file, callback) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            callback(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const onDone = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            toBase64(file, (base64) => {
                if (props && props.onDone) {
                    props.onDone(base64);
                }
            });
        } else {
            setFileName("No file chosen");
            if (props && props.onDone) {
                props.onDone(null);
            }
        }
    }

    const filePickerHandler = (e) => {
        e.preventDefault();
        const fileInput = document.getElementById("file-picker");
        fileInput.click();
    }

    return (
        <>
            <button onClick={filePickerHandler}>{props && props.pickerText ? props.pickerText : "Choose file"}</button><br />
            <span>{fileName}</span>
            <input id="file-picker" name={props && props.name !== "" ? props.name : ""} type="file" multiple={false} accept="image/*, .jpg, .jpeg, .png, .gif" onChange={onDone}></input>
        </>
    )

}

export default ImageInputBase64;