import "./App.css";
import { useState, useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import NoMatch from "./NoMatch";
import ErrorMsg from "./ErrorMsg";
import Article from "./Article";
const FETCH_ENDPOINT_URL = process.env.REACT_APP_HN_ENDPOINT;

const App = () => {
  const [articles, setArticles] = useState();
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getNews = () => {
      setIsError(false);

      // run spinner on load
      setIsFetching(true);
      // Fetch data with params, query param only added if searched for something
      fetch(
        `${FETCH_ENDPOINT_URL}?${
          query && `query=${query}&`
        }tags=story&hitsPerPage=20&restrictSearchableAttributes=title&page=${page}`
      )
        .then(
          (res) => {
            if (res.ok) return res.json();
            throw new Error("Network error");
          },
          (networkError) => {
            setIsFetching(false);
            setIsError(true);
            console.log(networkError.message);
          }
        )
        .then((data) => {
          setIsFetching(false);
          // set the state with new fetched data and articles
          setArticles({ data: data, hits: data.hits });
        })
        .catch((e) => {
          setIsFetching(false);
          setIsError(true);
          console.log(e.message);
        });
    };
    getNews();
    // refresh fetch every 5 minutes
    const id = setInterval(() => getNews(), 300000);
    return () => clearInterval(id);
  }, [query, page]);

  // handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setQuery(e.target.query.value);

    setPage(0);
    e.target.query.value = "";
  };

  // highlight query using regular expression
  const highlightQuery = (title) => {
    const regexp = new RegExp(query, "gi");
    const replacementPattern = "<mark>$&</mark>";
    const highlightedQuery = title.replaceAll(regexp, replacementPattern);
    console.log(highlightQuery);
    return { __html: highlightedQuery };
  };

  const displayArticles = () => {
    // map through fetched articles and display them as component
    if (articles && articles.hits.length) {
      return (
        <>
          <div className="d-flex flex-column ">
            {/* calculate list numeration */}
            <ol start={articles.data.hitsPerPage * articles.data.page + 1}>
              {articles.hits
                .filter((article) =>
                  query ? article.title.match(new RegExp(query, "gi")) : article
                )

                .map((article) => (
                  <li key={article.objectID} className="my-1">
                    <Article
                      {...article}
                      query={query}
                      highlightQuery={highlightQuery}
                    />
                  </li>
                ))}
            </ol>
            {/* go to previos page */}
          </div>
          <div className="d-flex justify-content-around pb-4">
            <button
              className="btn btn-outline-info"
              onClick={() => {
                if (page > 0) {
                  setPage(page - 1);
                }
              }}
            >
              Prev Page
            </button>
            {/* go to next page */}
            <button
              className="btn btn-outline-warning"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Next Page
            </button>
          </div>
          <footer className="text-center m-5 fs-6">created by claurennt</footer>
        </>
      );
    }

    // handle case when query search does not return any matches
    if (query && !articles.hits.length) {
      return <NoMatch />;
    }
  };

  return (
    <>
      <nav className="navbar d-flex justify-content-around d-flex align-items-center py-3 mb-4">
        <a href="/" className=" pageTitle display-4">
          Hacker News Clone
        </a>

        <form className="form-inline align-self-end" onSubmit={handleSubmit}>
          <input
            type="text"
            name="query"
            placeholder="Search word"
            className="fs-6"
          />
        </form>
      </nav>
      {query && (
        <p className="fs-4 text-center">Articles matching word: {query}</p>
      )}
      <div className="container container-fluid">
        {isError && <ErrorMsg />}

        {isFetching && (
          <Loader
            visible={isFetching}
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
          />
        )}
        {displayArticles()}
      </div>
    </>
  );
};

export default App;
