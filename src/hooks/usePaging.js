import { useState } from "react";

export default (intialPage = 0, initialPageSize = 10) => {
  const [offset, setOffset] = useState(intialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [lastPage, setLastPage] = useState(false);
  const pageNumber = Math.floor(offset / pageSize);
  return {
    offset,
    pageNumber,
    pageSize,
    lastPage,
    increment: () => setOffset(offset + pageSize),
    decrement: () => setOffset(offset - pageSize > 0 ? offset - pageSize : 0),
    setOffset,
    setPageSize,
    setLastPage
  };
};
