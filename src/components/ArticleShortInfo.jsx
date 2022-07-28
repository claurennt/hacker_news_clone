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
  // highlight query word in title using regular expression
  const highlightQuery = (title) => {
    const regexp = new RegExp(query, "gi");
    const replacementPattern = "<mark>$&</mark>";
    const highlightedQuery = title.replaceAll(regexp, replacementPattern);

    return { __html: highlightedQuery };
  };

  return (
    <>
      <div className="container ps-0 ">
        <a
          className="text-decoration-none link-dark fs-5 me-1 w-auto "
          style={{ cursor: "pointer" }}
          href={url && url.href}
          rel="noreferrer"
          target="_blank"
          onClick={() => {
            //on click show detailed view if article does not have a url
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
          className="text-decoration-none link-secondary fw-light align-self-center w-25 h-25 w-auto p-0 fs-6"
        >
          {url && `(${url.origin})`}
        </a>
      </div>
      <div className="d-flex flex-row ">
        <button
          className="cursor-default text-decoration-none p-0 border-0 bg-light"
          style={{ outline: "none" }}
        >
          {points} points by {author} {timeAgo} |{" "}
          {/* clicking on the span with the number of comment will display a detailed page with the article and its comments*/}
          <span onClick={() => handleClickedArticle(objectID)}>
            {numberOfComments}
          </span>
        </button>
      </div>
    </>
  );
};

export default ArticleShortInfo;
