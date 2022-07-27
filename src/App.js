import "./App.css";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import NoMatch from "./NoMatch";
import ErrorMsg from "./ErrorMsg";
import Article from "./components/Article";
import PaginationButtons from "./components/PaginationButtons";
import Footer from "./components/Footer";
import { ChasingDots } from "better-react-spinkit";

const App = () => {
  const [articles, setArticles] = useState();
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pageNr, setPageNr] = useState(0);
  const [clickedArticle, setClickedArticle] = useState();

  const baseUrl = "https://hn.algolia.com/api/v1/search_by_date";

  // https://medium.com/doctolib/react-stop-checking-if-your-component-is-mounted-3bb2568a4934
  useEffect(() => {
    // use abortController to cancel the fetch request if the component is unmounted
    const abortController = new AbortController(); // Create a new abort controller
    const getNews = () => {
      // run spinner on load
      setIsFetching(true);

      // Fetch data from API
      fetch(
        `${baseUrl}?tags=story&restrictSearchableAttributes=title&numericFilters=num_comments>0&query=${query}&page=${pageNr}`,
        { signal: abortController.signal }
      )
        .then((res) => {
          /*the res.ok property catches all the HTTP error codes outside the range 200..300
            so it is needed with fetch() to catch non-network errors*/
          if (!res.ok) throw new Error(`Error with status code ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setIsFetching(false);
          // set the state with new fetched data and articles
          setArticles(data);
        })
        .catch((e) => {
          setIsFetching(false);
          setIsError(true);
          //return if the error is coming from the abort controller interface
          if (e.name === "AbortError") return;

          //catch the error from the callback
          console.log(e);
        });
      return () => abortController.abort();
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

    // update query state
    setQuery(e.target.query.value);
    //reset page Number
    setPageNr(0);

    e.target.query.value = "";
  };

  const handleClickedArticle = (clickedId) => {
    //find the article we clicked on and make it the detailed view
    const foundArticle = articles.hits.find(
      (article) => article.objectID === clickedId
    );
    setClickedArticle(foundArticle);
  };

  //function that display the articles and the children components
  const displayArticles = () => {
    if (articles && articles.hits.length) {
      const { hitsPerPage, hits, page } = articles;
      return (
        <>
          <div className="d-flex flex-column ">
            {/* calculate list numeration */}
            <ol start={`${hitsPerPage * page + 1}`}>
              {hits
                .filter((article) =>
                  /*if we click on the comments under an article or on an articles's title that does not have a url then
                  we filter the article that has the same id as the clickedArticle and return it, else we return all articles */
                  clickedArticle
                    ? article.objectID === clickedArticle.objectID
                    : article
                )
                .map((article) => (
                  <li key={crypto.randomUUID()} className="my-1">
                    <Article
                      {...article}
                      query={query}
                      clickedArticle={clickedArticle}
                      handleClickedArticle={handleClickedArticle}
                      setClickedArticle={setClickedArticle}
                    />
                  </li>
                ))}
            </ol>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Navbar
        handleSubmit={handleSubmit}
        clickedArticle={clickedArticle}
        isError={isError}
      />
      {/* display no match component if there is a query but no article matches the given query */}
      {query && !articles?.hits?.length > 0 && <NoMatch />}

      {/* if there is a match when searching for a term display small info about queried word*/}
      {query && articles?.hits?.length > 0 && (
        <p className="fs-4 text-center">Articles matching word: {query}</p>
      )}
      <div className="container container-fluid">
        {isError && <ErrorMsg />}

        {/* display spinner on fetching articles or articles when fetching is completed */}
        {isFetching ? (
          <ChasingDots size={50} color="#ff6600" />
        ) : (
          displayArticles()
        )}

        {/* display pagination buttons on general view after fetching is complete and when there is no error */}
        {!clickedArticle && !isFetching && !isError && (
          <PaginationButtons pageNr={pageNr} setPageNr={setPageNr} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default App;
