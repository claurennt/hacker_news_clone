import "./App.css";
import { useState, useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Navbar from "./components/Navbar";
import NoMatch from "./NoMatch";
import ErrorMsg from "./ErrorMsg";
import Article from "./components/Article";
import PaginationButtons from "./components/PaginationButtons";

const App = () => {
  const baseUrl = "https://hn.algolia.com/api/v1/search_by_date";
  const [articles, setArticles] = useState();
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pageNr, setPageNr] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [detailedView, setDetailedView] = useState();

  useEffect(() => {
    const getNews = () => {
      // run spinner on load
      setIsFetching(true);

      // Fetch data from API
      fetch(
        `${baseUrl}?tags=story&restrictSearchableAttributes=title&numericFilters=num_comments>0&query=${query}&page=${pageNr}`
      )
        .then(
          (res) => {
            /*the res.ok property catches all the HTTP error codes outside the range 200..300
            so it is needed with fetch to catch non-network errors*/
            if (!res.ok)
              throw new Error(`Error with status code ${res.status}`);
            return res.json();
          },
          // if we want to catch a network error we pass a second callback to the then chaining
          (networkError) => {
            setIsFetching(false);
            setIsError(true);
            //we throw a custom error to the catch block
            throw new Error(`Network Error ${networkError.message}`);
          }
        )
        .then((data) => {
          setIsFetching(false);
          // set the state with new fetched data and articles
          setArticles(data);
        })
        .catch((e) => {
          setIsFetching(false);
          setIsError(true);
          //catch the error from the callback
          console.log(e);
        });
    };

    getNews();
    // refresh fetch every 5 minutes
    const id = setInterval(() => getNews(), 300000);

    // clear the interval when the component is unmounted
    return () => clearInterval(id);
  }, [query, pageNr]);

  // handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setQuery(e.target.query.value);

    setPageNr(0);
    e.target.query.value = "";
  };

  const handleClickedArticle = (clickedId) => {
    console.log(articles);
    const clickedArticle = articles.hits.find(
      (article) => article.objectID === clickedId
    );
    setDetailedView(clickedArticle);
  };

  const displayArticles = () => {
    if (articles && articles.hits.length > 0) {
      const { hitsPerPage, hits, page } = articles;
      return (
        <>
          <div className="d-flex flex-column ">
            {/* calculate list numeration */}
            <ol
              start={`${
                page === 0 ? hitsPerPage * page + 1 : hitsPerPage * page
              }`}
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
                      setIsClicked={setIsClicked}
                      query={query}
                      detailedView={detailedView}
                      handleClickedArticle={handleClickedArticle}
                      setDetailedView={setDetailedView}
                    />
                  </li>
                ))}
            </ol>
            {/* go to previos page */}
            <PaginationButtons setPageNr={setPageNr} pageNr={pageNr} />
          </div>
          <footer className="text-center m-5 fs-6">created by claurennt</footer>
        </>
      );
    }
  };

  return (
    <>
      <Navbar handleSubmit={handleSubmit} />
      {query && !articles?.hits?.length > 0 && <NoMatch />}

      {/* if there is a match when searchign for a term display small info about queried word*/}
      {query && articles?.hits?.length > 0 && (
        <p className="fs-4 text-center">Articles matching word: {query}</p>
      )}
      <div className="container container-fluid">
        {isError && <ErrorMsg />}

        {isFetching ? (
          <Loader
            visible={isFetching}
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
          />
        ) : (
          displayArticles()
        )}
      </div>
    </>
  );
};

export default App;
