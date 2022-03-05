import "./App.css";
import { Component } from "react";

import Navbar from "./components/Navbar";
import NoMatch from "./components/NoMatch";
import ErrorMsg from "./components/ErrorMsg";
import Articles from "./components/Articles";
import PaginationButtons from "./components/PaginationButtons";
import Footer from "./components/Footer";
import { ChasingDots } from "better-react-spinkit";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      query: "",
      isFetching: false,
      isError: false,
      pageNr: 0,
      detailedView: null,
    };

    this.abortController = new AbortController();
    this.baseUrl = "https://hn.algolia.com/api/v1/";

    this.handleClickedArticle = this.handleClickedArticle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const getNews = async () => {
      try {
        this.setState({ isFetching: true });

        const res = await fetch(
          `${this.baseUrl}search_by_date?tags=story&restrictSearchableAttributes=title&numericFilters=num_comments>0&query=${this.state.query}&page=${this.state.pageNr}`,
          { signal: this.abortController.signal }
        );

        const data = await res.json();

        this.setState({ articles: data, isFetching: false });
      } catch (e) {
        if (e.name === "AbortError") return;

        this.setState({ isFetching: false, isError: true });

        console.log(e);
      }
    };
    getNews();
    const id = setInterval(() => getNews(), 300000);
    this.id = id;
  }

  componentWillUnmount() {
    clearInterval(this.id);

    this.abortController.abort();
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ query: e.target.query.value, page: 0 });

    e.target.query.value = "";
  }

  handleClickedArticle(clickedId) {
    const clickedArticle = this.state.articles.hits.find(
      (article) => article.objectID === clickedId
    );

    this.setState({ detailedView: clickedArticle });
  }

  render() {
    const { detailedView, query, articles, isFetching, isError, pageNr } =
      this.state;

    return (
      <>
        <Navbar handleSubmit={this.handleSubmit} detailedView={detailedView} />
        {query && !articles?.hits?.length > 0 && <NoMatch />}

        {query && articles?.hits?.length > 0 && (
          <p className="fs-4 text-center">Articles matching word: {query}</p>
        )}
        <div className="container container-fluid">
          {isError && <ErrorMsg />}

          {isFetching && <ChasingDots size={50} color="#ff6600" />}

          {articles && articles.hits.length > 0 && (
            <Articles
              {...articles}
              query={query}
              detailedView={detailedView}
              handleClickedArticle={this.handleClickedArticle}
            />
          )}

          {!detailedView && !isFetching && (
            <PaginationButtons pageNr={pageNr} />
          )}
        </div>

        <Footer />
      </>
    );
  }
}
export default App;
