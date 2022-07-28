import { useRef } from "react";
import Comment from "./Comment";

import parse from "html-react-parser";

const ArticleDetailed = ({ story_text, comments }) => {
  const parentRef = useRef();
  return (
    <>
      <div className="mt-4">{story_text && parse(story_text)}</div>

      {comments?.map((comment) => {
        return (
          <Comment
            parentRef={parentRef}
            {...comment}
            key={crypto.randomUUID()}
          />
        );
      })}
    </>
  );
};

export default ArticleDetailed;
