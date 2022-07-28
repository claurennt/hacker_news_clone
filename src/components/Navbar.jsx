import React from "react";
import logo from "../logo.gif";
import ReturnToMain from "./ReturnToMain";
import SearchForm from "./SearchForm";
const Navbar = ({ handleSubmit, clickedArticle, isError }) => (
  <nav className="navbar d-flex justify-content-space-around d-flex p-0 mb-4">
    <div>
      <img alt="hacker-news-logo" src={logo} width="20vw" />
      <a href="/" className="text-decoration-none fs-6 fw-bold pageTitle">
        Hacker News Clone
      </a>
    </div>
    {clickedArticle || isError ? (
      <ReturnToMain />
    ) : (
      <SearchForm handleSubmit={handleSubmit} />
    )}
  </nav>
);

export default Navbar;
