import { useRef, useState } from "react";

const ArticleShortInfo = ({
  points,
  timeAgo,
  author,
  title,
  query,
  url,
  numberOfComments,
  setDetailedView,
  handleClickedArticle,
  objectID,
  setIsClicked,
}) => {
  const myArticle = useRef(null);
  const [isShown, setIsShown] = useState(true);

  // highlight query using regular expression
  const highlightQuery = (title) => {
    const regexp = new RegExp(query, "gi");
    const replacementPattern = "<mark>$&</mark>";
    const highlightedQuery = title.replaceAll(regexp, replacementPattern);

    return { __html: highlightedQuery };
  };

  return (
    <>
      <div ref={myArticle}>
        <div className="d-flex flex-row">
          <a
            className="text-decoration-none link-dark fs-5"
            href={url && url.href}
            rel="noreferrer"
            target="_blank"
            dangerouslySetInnerHTML={
              query ? highlightQuery(title) : { __html: title }
            }
          ></a>
          <a
            href={url && url.origin}
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none link-secondary bg-light fw-light ms-3 p-1"
          >
            {url ? url.origin : ""}
          </a>
        </div>
        <div className="d-flex flex-row ">
          <button
            style={{
              textDecoration: "none",
              padding: "0px",
              margin: "0px 3px",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: "14px",
              cursor: "default",
            }}
          >
            {points} points by {author} {timeAgo}
          </button>
          |
          <button
            style={{
              textDecoration: "underline",
              padding: "0px",
              margin: "0px 3px",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: "14px",
            }}
            onClick={() => {
              handleClickedArticle(objectID);
            }}
          >
            {numberOfComments}
          </button>
        </div>
      </div>
    </>
  );
};

export default ArticleShortInfo;
