import React from "react";
import Comment from "./Comment";
const ArticleDetailed = ({ story_text, comments }) => {
  console.log(comments);
  console.log(story_text);
  return (
    <>
      {story_text && <p>{story_text}</p>}
      {comments?.map((comment) => (
        <Comment {...comment} key={crypto.randomUUID()} />
      ))}
    </>
  );
};

export default ArticleDetailed;
