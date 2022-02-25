import React from "react";

const Navbar = ({ handleSubmit }) => (
  <nav className="navbar d-flex justify-content-around d-flex align-items-center py-3 mb-4">
    <a href="/" className=" pageTitle display-4">
      Hacker News Clone
    </a>

    <form className="form-inline align-self-end" onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        placeholder="Search word"
        className="fs-6"
      />
    </form>
  </nav>
);

export default Navbar;
