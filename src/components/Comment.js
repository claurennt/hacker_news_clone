import React, { useRef } from "react";
import parse from "html-react-parser";

import calculateTimeAgo from "../utils/calculateTimeAgo";

const Comment = ({ created_at, author, text, children, nested = 0 }) => {
  const timeAgo = calculateTimeAgo(created_at);

  const parent = useRef(null);
  //handle navigation to parent comment of current comment
  const navigateToParentComment = () => {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: parent.current.parentNode.offsetTop,
    });
  };

  return (
    <>
      {text && (
        <div
          ref={parent}
          style={{ fontSize: "0.8rem", paddingLeft: nested * 5 }}
        >
          <div className="d-flex flex-row">
            {" "}
            <p className="fw- pt-1 ">
              <span style={{ fontSize: "1.2rem" }}>▴</span> {author} {timeAgo}
            </p>{" "}
            <button
              className="fw-light text-decoration-none border-0 bg-transparent"
              style={{
                padding: "0px",
                margin: "0px 3px",
                marginTop: "10px",
                fontSize: "0.7rem",
              }}
              onClick={navigateToParentComment}
            >
              | parent
            </button>
          </div>
          {parse(text)}
          {/* recursively render nested comments and their children with increasing padding left value */}
          {children?.map((commentToComment) => (
            <Comment
              {...commentToComment}
              nested={nested + 4}
              key={crypto.randomUUID()}
            />
          ))}{" "}
        </div>
      )}
    </>
  );
};

export default Comment;
