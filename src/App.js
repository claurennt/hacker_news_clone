import "./App.css";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import NoMatch from "./NoMatch";
import ErrorMsg from "./ErrorMsg";
import Article from "./components/Article";
import PaginationButtons from "./components/PaginationButtons";
import { ChasingDots } from "better-react-spinkit";

const App = () => {
  const [articles, setArticles] = useState();
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [pageNr, setPageNr] = useState(0);
  const [detailedView, setDetailedView] = useState();
  const [isLoadingComments, setIsLoadingComments] = useState(false);

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
          console.log(e.name);
          //return if the error is coming from the abort controller interface
          if (e.name === "AbortError") return;
          setIsFetching(false);
          setIsError(true);
          //catch the error from the callback
          console.log(e);
        });
      return () => abortController.abort();
    };

    getNews();
    // refresh fetch every 5 minutes
    const id = setInterval(() => getNews(), 20000);

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
    //set to true to display the loading spinner
    setIsLoadingComments(true);
    //find the article we clicked on and make it the detailed view
    const clickedArticle = articles.hits.find(
      (article) => article.objectID === clickedId
    );
    setDetailedView(clickedArticle);
    //remove the loader
    setIsLoadingComments(false);
  };

  //function that display the articles and the children components
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
                  //filter the articles if there is a search word
                  query ? article.title.match(new RegExp(query, "gi")) : article
                )
                .filter((article) =>
                  //display detailed view of article that has been clicked on, (click on comment button or article title)
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
                      setDetailedView={setDetailedView}
                      isLoadingComments={isLoadingComments}
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
      <Navbar handleSubmit={handleSubmit} />
      {/* display no match component if query does not match any article */}
      {query && !articles?.hits?.length > 0 && <NoMatch />}

      {/* if there is a match when searching for a term display small info about queried word*/}
      {query && articles?.hits?.length > 0 && (
        <p className="fs-4 text-center">Articles matching word: {query}</p>
      )}
      <div className="container container-fluid">
        {isError && <ErrorMsg />}

        {/* display spinner on lfetching articles */}
        {isFetching ? (
          <ChasingDots size={50} color="#ff6600" />
        ) : (
          displayArticles()
        )}
        {/* display spinner when loading comments */}
        {isLoadingComments && <ChasingDots size={50} color="#ff6600" />}
        {/* display pagination buttons on general view after fetching is complete */}
        {!detailedView && !isFetching && (
          <PaginationButtons pageNr={pageNr} setPageNr={setPageNr} />
        )}
      </div>
    </>
  );
};

export default App;
