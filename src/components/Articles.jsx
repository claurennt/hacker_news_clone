import Article from "./Article";

const Articles = ({
  hits,
  hitsPerPage,
  page,
  query,
  detailedView,
  handleClickedArticle,
}) => {
  console.log(hits);
  return (
    <>
      <div className="d-flex flex-column ">
        <ol
          start={`${page === 0 ? hitsPerPage * page + 1 : hitsPerPage * page}`}
        >
          {hits
            .filter((article) =>
              query ? article.title.match(new RegExp(query, "gi")) : article
            )
            .filter((article) =>
              detailedView
                ? article.objectID === detailedView.objectID
                : article
            )
            .map((article) => (
              <li key={crypto.randomUUID()} className="my-1">
                <Article
                  {...article}
                  query={query}
                  detailedView={detailedView}
                  handleClickedArticle={handleClickedArticle}
                />
              </li>
            ))}
        </ol>
      </div>
    </>
  );
};
export default Articles;
