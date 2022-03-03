const SearchForm = ({ handleSubmit }) => (
  <form className="form-inline align-self-center" onSubmit={handleSubmit}>
    <input
      type="text"
      name="query"
      placeholder="Search word"
      className="fs-6 mt-2 form-control"
    />
  </form>
);

export default SearchForm;
