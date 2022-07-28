import React, { useRef, useState } from "react";
import parse from "html-react-parser";

import calculateTimeAgo from "../utils/calculateTimeAgo";
import CommentNavigationButton from "./CommentNavigationButton";
const Comment = ({ created_at, author, text, children, nested = 0, id }) => {
  const timeAgo = calculateTimeAgo(created_at);
  const [show, setShow] = useState(true);

  const localCommentNode = useRef();

  //handle navigation to parent comment
  const navigateToParentComment = () => {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: localCommentNode?.current.parentNode.offsetTop,
    });
  };

  //handle navigation to previous  comment
  const navigateToPreviousComment = () => {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: localCommentNode?.current.previousSibling?.offsetTop,
    });
  };

  //handle navigation to next comment
  const navigateToNextComment = () => {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: localCommentNode?.current.nextSibling?.offsetTop,
    });
  };

  //handle navigation to root comment
  const navigateToRootComment = () => {
    //traverse dom to find root comment element of current comment and scroll to it
    let current = localCommentNode.current;
    while (current.parentNode.getAttribute("data-id")) {
      current = current.parentNode;
    }
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: current.offsetTop,
    });
  };

  const showNumberOfNestedComments = children.length
    ? children.length
    : children.length + 1;

  return (
    <>
      {text && (
        <div
          ref={localCommentNode}
          style={{ fontSize: "0.8rem", paddingLeft: nested * 5 }}
          //the id attribute is used as a reference for the scroll
          data-id={id}
        >
          <div className="d-flex flex-row">
            {" "}
            <p>
              <span style={{ fontSize: "1.2rem" }}>▴</span> {author} {timeAgo}
            </p>{" "}
            <CommentNavigationButton
              text="| root |"
              handleClick={navigateToRootComment}
            />
            <CommentNavigationButton
              text="| parent |"
              handleClick={navigateToParentComment}
            />
            <CommentNavigationButton
              text="| prev |"
              handleClick={navigateToPreviousComment}
            />
            <CommentNavigationButton
              text="| next |"
              handleClick={navigateToNextComment}
            />
            <button
              className="fw-light text-decoration-none border-0 bg-transparent p-0 mt-2 ms-2"
              style={{
                fontSize: "0.7rem",
              }}
              onClick={() => setShow(!show)}
            >
              {show ? "[−]" : `[${showNumberOfNestedComments} more]`}
            </button>
          </div>
          {show && parse(text)}
          {/* recursively render nested comments and their children with increasing padding left value */}
          {children?.map((commentToComment) => (
            <Comment
              {...commentToComment}
              parentId={id}
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
