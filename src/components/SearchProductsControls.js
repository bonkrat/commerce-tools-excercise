import React from "react";
import Paging from "../containers/PagingContainer";
import PagingControls from "./PagingControls";
import SearchProductsInput from "./SearchProductsInput";

/**
 * Renders controls for searching for products.
 */
export default () => {
  const pagingProps = Paging.useContainer();
  return (
    <div className="flex justify-between bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="w-2/3">
        <SearchProductsInput />
      </div>
      <div className="flex items-center">
        <PagingControls {...pagingProps} />
      </div>
    </div>
  );
};
