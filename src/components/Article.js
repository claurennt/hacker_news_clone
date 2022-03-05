import { Component } from "react";

import calculateTimeAgo from "../utils/calculateTimeAgo";
import displayNumberOfComments from "../utils/displayNumberOfComments";

import ArticleDetailed from "./ArticleDetailed";
import ArticleShortInfo from "./ArticleShortInfo";

class Article extends Component {
  constructor(props) {
    super(props);
    const { created_at, num_comments } = this.props;

    this.state = { comments: null };

    this.numberOfComments = displayNumberOfComments(num_comments);
    this.timeAgo = calculateTimeAgo(created_at);

    this.abortController = new AbortController();
  }

  componentDidMount() {
    const getComments = async () => {
      try {
        const res = await fetch(
          `http://hn.algolia.com/api/v1/items/${this.props.objectID}`,
          {
            signal: this.abortController.signal,
          }
        );
        const { children } = await res.json();

        this.setState({ comments: children });
      } catch (e) {
        if (e.name === "AbortError") return;
        console.log(e);
      }
    };

    getComments();
  }
  componentWillUnmount() {
    this.abortController.abort();
  }

  if(url) {
    url = new URL(url);
  }

  render() {
    const {
      url,
      objectID,
      created_at,
      num_comments,
      detailedView,
      setDetailedView,
      handleClickedArticle,
      story_text,
      ...rest
    } = this.props;

    return (
      <>
        {
          <ArticleShortInfo
            handleClickedArticle={handleClickedArticle}
            setDetailedView={setDetailedView}
            timeAgo={this.timeAgo}
            url={url}
            numberOfComments={this.numberOfComments}
            objectID={objectID}
            {...rest}
          />
        }
        {detailedView && (
          <ArticleDetailed
            comments={this.state.comments}
            story_text={story_text}
          />
        )}
      </>
    );
  }
}

export default Article;
