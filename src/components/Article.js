import React, { useEffect, useState } from "react";
import calculateTimeAgo from "../utils/calculateTimeAgo";
export default function Article({
  title,
  url,
  query,
  objectID,
  author,
  created_at,
}) {
  const [, /*comments*/ setComments] = useState();
  const [toggleComments, setToggleComments] = useState(false);
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
      .then((children) => {
        setComments(children);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [objectID]);

  if (url) {
    url = new URL(url);
  }

  // highlight query using regular expression
  const highlightQuery = (title) => {
    const regexp = new RegExp(query, "gi");
    const replacementPattern = "<mark>$&</mark>";
    const highlightedQuery = title.replaceAll(regexp, replacementPattern);

    return { __html: highlightedQuery };
  };

  const timeAgo = calculateTimeAgo(created_at);

  return (
    <div>
      <div className="d-flex flex-row">
        <a
          className="text-decoration-none link-dark fs-5"
          href={url && url.href}
          rel="noreferrer"
          target="_blank"
          dangerouslySetInnerHTML={
            query ? highlightQuery(title) : { __html: title }
          }
        ></a>
        <a
          href={url && url.origin}
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none link-secondary bg-light fw-light ms-3 p-1"
        >
          {url ? url.origin : ""}
        </a>
      </div>
      <div className="d-flex flex-row ">
        <button
          style={{
            textDecoration: "none",
            padding: "0px",
            margin: "0px 3px",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            fontSize: "14px",
            cursor: "default",
          }}
        >
          by {author}
        </button>
        |
        <button
          style={{
            textDecoration: "none",
            padding: "0px",
            margin: "0px 3px",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            fontSize: "14px",
            cursor: "default",
          }}
        >
          {timeAgo}
        </button>
        |
        <button
          style={{
            textDecoration: "underline",
            padding: "0px",
            margin: "0px 3px",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            fontSize: "14px",
          }}
          onClick={() => setToggleComments(!toggleComments)}
        >
          comments
        </button>
      </div>
      {toggleComments && <div>cc</div>}
    </div>
  );
}
