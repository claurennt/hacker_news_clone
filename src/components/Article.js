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
  detailedView,
  setDetailedView,
  handleClickedArticle,
  ...rest
}) {
  const [comments, setComments] = useState();
  console.log(rest);
  useEffect(() => {
    // Fetch the comments for each article
    fetch(`http://hn.algolia.com/api/v1/items/${objectID}`)
      .then(
        (res) => {
          if (!res.ok) throw new Error(`Error with status code ${res.status}`);
          return res.json();
        },

        (networkError) => {
          throw new Error(`Network Error ${networkError.message}`);
        }
      )
      .then(({ children }) => {
        setComments(children);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [objectID]);

  if (url) {
    url = new URL(url);
  }

  const timeAgo = calculateTimeAgo(created_at);
  const numberOfComments = displayNumberOfComments(num_comments);

  return (
    <>
      {
        <ArticleShortInfo
          handleClickedArticle={handleClickedArticle}
          setIsClicked={setDetailedView}
          setDetailedView={setDetailedView}
          timeAgo={timeAgo}
          url={url}
          numberOfComments={numberOfComments}
          objectID={objectID}
          {...rest}
        />
      }{" "}
      {detailedView && <ArticleDetailed comments={comments} {...rest} />}
    </>
  );
}
