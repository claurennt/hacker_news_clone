const style = {
  textDecoration: "none",
  padding: "0px",
  margin: "0px 3px",
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  fontSize: "14px",
};

const ArticleShortInfo = ({
  points,
  timeAgo,
  author,
  title,
  query,
  url,
  numberOfComments,
  handleClickedArticle,
  objectID,
}) => {
  // highlight query using regular expression
  const highlightQuery = (title) => {
    const regexp = new RegExp(query, "gi");
    const replacementPattern = "<mark>$&</mark>";
    const highlightedQuery = title.replaceAll(regexp, replacementPattern);

    return { __html: highlightedQuery };
  };

  return (
    <>
      <div className="d-flex flex-row">
        <a
          className="text-decoration-none link-dark fs-5"
          style={{ cursor: "pointer" }}
          href={url && url.href}
          rel="noreferrer"
          target="_blank"
          onClick={() => {
            //show detailed view if article does not have a url
            if (!url) handleClickedArticle(objectID);
          }}
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
        <button style={{ ...style, cursor: "default" }}>
          {points} points by {author} {timeAgo}
        </button>
        |
        <button
          style={style}
          onClick={() => {
            handleClickedArticle(objectID);
          }}
        >
          {numberOfComments}
        </button>
      </div>
    </>
  );
};

export default ArticleShortInfo;
