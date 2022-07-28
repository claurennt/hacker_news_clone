import React from "react";

const CommentNavigationButton = ({ handleClick, text }) => (
  <button
    className="fw-light text-decoration-none border-0 bg-transparent p-0 mt-2 ms-2"
    style={{ fontSize: "0.7rem" }}
    onClick={handleClick}
  >
    {text}
  </button>
);

export default CommentNavigationButton;
