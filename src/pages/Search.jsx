import React from "react";
import FetcherSearch from "../components/Fetcher/SearchMovies";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Search = () => {
  const location = useLocation();

  const getQueryParams = (queryString) => {
    const params = new URLSearchParams(queryString);
    return params.get("query");
  };

  const queryValue = getQueryParams(location.search);
  const searchResults = useSelector((state) => state.search.search);

  console.log("Search query : " + queryValue);
  return (
    <div>
      <FetcherSearch query={queryValue} />
    </div>
  );
};

export default Search;
