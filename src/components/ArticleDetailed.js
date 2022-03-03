import Comment from "./Comment";

import parse from "html-react-parser";

const ArticleDetailed = ({ story_text, comments }) => {
  return (
    <>
      <div className="mt-4">{story_text && parse(story_text)}</div>
      {comments?.map((comment) => (
        <Comment {...comment} key={crypto.randomUUID()} />
      ))}
    </>
  );
};

export default ArticleDetailed;
