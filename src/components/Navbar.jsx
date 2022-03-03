import React from "react";
import ReturnToMain from "./ReturnToMain";
import SearchForm from "./SearchForm";
const Navbar = ({ handleSubmit, detailedView }) => (
  <nav className="navbar d-flex justify-content-evenly d-flex p-3 mb-4">
    <a href="/" className=" pageTitle display-4 me-0">
      Hacker News Clone
    </a>
    {detailedView ? (
      <ReturnToMain />
    ) : (
      <SearchForm handleSubmit={handleSubmit} />
    )}
  </nav>
);

export default Navbar;
