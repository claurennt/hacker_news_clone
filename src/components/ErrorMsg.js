import React from "react";
import ReturnToMain from "./ReturnToMain";
const ErrorMsg = () => (
  <div className="d-flex justify-content-center ">
    <iframe
      src="https://giphy.com/embed/3OuTfmS9cTxqOvdI4y"
      width="480"
      height="480"
      frameBorder="0"
      title="Error Gif"
      allowFullScreen
    ></iframe>
    <ReturnToMain />
  </div>
);

export default ErrorMsg;
