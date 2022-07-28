const SearchForm = ({ handleSubmit }) => (
  <form className="me-1 searchForm" onSubmit={handleSubmit}>
    <input
      type="text"
      name="query"
      placeholder="Search word"
      className=" form-control form-control-sm"
    />
  </form>
);

export default SearchForm;
