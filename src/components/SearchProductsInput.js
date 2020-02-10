import React, { useState } from "react";
import Paging from "../containers/PagingContainer";
import QueryPredicate from "../containers/QueryPredicateContainer";
import { debounce } from "lodash";

/**
 * Renders a component that handles an input search form for products.
 */
export default () => {
  const [searchValue, setSearchValue] = useState("");
  const { setQueryPredicate } = QueryPredicate.useContainer();
  const { setOffset } = Paging.useContainer();

  return (
    <div className="w-2/3">
      <input
        placeholder="Product Name (Exact Match)"
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        id="inline-full-name"
        type="text"
        onChange={e => {
          setSearchValue(e.target.value);
          debounce(val => {
            setQueryPredicate(val);
            setOffset(0);
          }, 500)(e.target.value);
        }}
        value={searchValue}
      />
    </div>
  );
};
