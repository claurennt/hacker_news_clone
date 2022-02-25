import React from "react";

const PaginationButtons = ({ pageNr, setPageNr }) => (
  <div className="d-flex justify-content-around pb-4">
    <button
      className="btn btn-outline-info"
      onClick={() => {
        if (pageNr > 0) {
          setPageNr((prev) => prev - 1);
        }
      }}
    >
      Prev Page
    </button>

    <button
      className="btn btn-outline-warning"
      onClick={() => {
        setPageNr((prev) => prev + 1);
      }}
    >
      Next Page
    </button>
  </div>
);

export default PaginationButtons;
