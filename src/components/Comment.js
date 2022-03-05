import React, { Component, createRef } from "react";
import parse from "html-react-parser";

import calculateTimeAgo from "../utils/calculateTimeAgo";

class Comment extends Component {
  constructor(props) {
    super(props);
    const { created_at } = this.props;
    this.timeAgo = calculateTimeAgo(created_at);

    this.parent = createRef(null);

    this.navigateToParentComment = this.navigateToParentComment.bind(this);
  }

  navigateToParentComment() {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: this.parent.current.parentNode.offsetTop,
    });
  }

  render() {
    const { author, text, children, nested = 0 } = this.props;

    return (
      <>
        {text && (
          <div
            ref={this.parent}
            style={{ fontSize: "0.8rem", paddingLeft: nested * 5 }}
          >
            <div className="d-flex flex-row">
              {" "}
              <p className="fw- pt-1 ">
                <span style={{ fontSize: "1.2rem" }}>▴</span> {author}{" "}
                {this.timeAgo}
              </p>{" "}
              <button
                className="fw-light text-decoration-none border-0 bg-transparent"
                style={{
                  padding: "0px",
                  margin: "0px 3px",
                  marginTop: "10px",
                  fontSize: "0.7rem",
                }}
                onClick={this.navigateToParentComment}
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
  }
}
export default Comment;
