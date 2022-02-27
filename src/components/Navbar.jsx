import React from "react";

const Navbar = ({ handleSubmit }) => (
  <nav className="navbar d-flex justify-content-evenly d-flex p-3 mb-4">
    <a href="/" className=" pageTitle display-4 me-0">
      Hacker News Clone
    </a>

    <form className="form-inline align-self-center" onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        placeholder="Search word"
        className="fs-6 mt-2 form-control"
      />
    </form>
  </nav>
);

export default Navbar;
