import { useState } from "react";

/**
 * Provides a query predicate for searching the commercetools GraphQL products
 * API by name.
 *
 * @param {string} intialState the default product name as a search term.
 */
export default (initialState = "") => {
  const [queryPredicate, setQueryPredicate] = useState(initialState);
  return {
    queryPredicate,
    setQueryPredicate: searchTerm =>
      setQueryPredicate(
        searchTerm ? `masterData(current(name(en=\\"${searchTerm}\\")))` : ""
      )
  };
};
