import React from "react";

export default function NoMatch() {
  return (
    <div className="container-fluid d-flex align-items-center flex-column">
      <p className="display-5">No Matches</p>
      <iframe
        src="https://giphy.com/embed/l4FGEhHXgExT9UquA"
        width="480"
        height="356"
        frameBorder="0"
        title="No Matches Gif"
        allowFullScreen
      ></iframe>
      <a href="/" className="my-5">
        Return To Main{" "}
      </a>
    </div>
  );
}
