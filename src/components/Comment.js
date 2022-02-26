import React from "react";
import calculateTimeAgo from "../utils/calculateTimeAgo";

const Comment = ({ created_at, author, text, children }) => {
  const timeAgo = calculateTimeAgo(created_at);

  return (
    <div>
      <p>
        {author} {timeAgo}
      </p>
      {text}
    </div>
  );
};

export default Comment;
