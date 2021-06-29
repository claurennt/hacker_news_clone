import React from "react";

export default function Article({ title, url, highlightQuery, query }) {
  if (url) {
    url = new URL(url);
  } else {
    url = new URL("https://www.google.com");
  }

  return (
    <>
      <a
        className="text-decoration-none link-dark fs-6"
        href={url}
        rel="noreferrer"
        target="_blank"
        dangerouslySetInnerHTML={
          query ? highlightQuery(title) : { __html: title }
        }
      ></a>
      <a
        href={url.origin}
        target="_blank"
        rel="noreferrer"
        className="text-decoration-none link-secondary bg-light fw-light ms-3"
      >
        {" "}
        ({url.origin}){" "}
      </a>
    </>
  );
}
