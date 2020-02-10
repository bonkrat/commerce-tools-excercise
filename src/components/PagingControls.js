import React from "react";
import PropTypes from "prop-types";

/**
 * A button group for paging through data.
 */
const PagingControls = ({ pageNumber, increment, decrement, lastPage }) => {
  return (
    <div className="w-1/3 flex items-center">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        onClick={() => decrement()}
      >
        Prev
      </button>
      <div className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-l">
        {pageNumber}
      </div>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        onClick={() => !lastPage && increment()}
      >
        Next
      </button>
    </div>
  );
};

PagingControls.propTypes = {
  /**
   * The current page number.
   */
  pageNumber: PropTypes.number,
  /**
   * Handler for incrementing the page number.
   */
  increment: PropTypes.func,
  /**
   * Handler for decrementing the page number.
   */
  decrement: PropTypes.func,
  /**
   * Whether the current page is the last page of data.
   */
  lastPage: PropTypes.bool
};

export default PagingControls;
