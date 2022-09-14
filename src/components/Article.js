import React, { useEffect, useState } from "react";

import calculateTimeAgo from "../utils/calculateTimeAgo";
import displayNumberOfComments from "../utils/displayNumberOfComments";

import ArticleDetailed from "./ArticleDetailed";
import ArticleShortInfo from "./ArticleShortInfo";

export default function Article({
  url,
  objectID,
  created_at,
  num_comments,
  clickedArticle,
  setClickedArticle,
  handleClickedArticle,
  ...rest
}) {
  const [comments, setComments] = useState();

  useEffect(() => {
    //use abort controller interface to cancel the fetch request
    const abortController = new AbortController();

    // Fetch the comments for each article
    fetch(`https://hn.algolia.com/api/v1/items/${objectID}`, {
      signal: abortController.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error with status code ${res.status}`);
        return res.json();
      })
      .then(({ children }) => {
        setComments(children);
      })
      .catch((e) => {
        //return if the error is coming from the abort controller interface
        if (e.name === "AbortError") return;
        console.log(e.statusCode);
      });

    //cancel the fetch request when the component is unmounted
    return () => abortController.abort();
  }, [objectID]);

  // create a url object with the url prop
  if (url) {
    url = new URL(url);
  }

  //get time when article was posted
  const timeAgo = calculateTimeAgo(created_at);

  //display string with number of comments
  const numberOfComments = displayNumberOfComments(num_comments);

  return (
    <>
      {
        <ArticleShortInfo
          handleClickedArticle={handleClickedArticle}
          setClickedArticle={setClickedArticle}
          timeAgo={timeAgo}
          url={url}
          numberOfComments={numberOfComments}
          objectID={objectID}
          {...rest}
        />
      }{" "}
      {clickedArticle && <ArticleDetailed comments={comments} />}
    </>
  );
}
