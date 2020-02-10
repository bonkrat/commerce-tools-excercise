import usePaging from "./usePaging";
import { useState } from "react";

jest.mock("react", () => ({
  useState: jest
    .fn()
    .mockReturnValueOnce([1, jest.fn()])
    .mockReturnValueOnce([10, jest.fn()])
    .mockReturnValueOnce([false, jest.fn()])
}));

it("provides paging state and state handlers", () => {
  const result = usePaging(1, 25);
  expect(useState.mock.calls[0]).toEqual([1]);
  expect(useState.mock.calls[1]).toEqual([25]);
  expect(useState.mock.calls[2]).toEqual([false]);
  expect(result.offset).toEqual(1);
  expect(result.pageNumber).toEqual(0);
  expect(result.pageSize).toEqual(10);
  expect(result.lastPage).toEqual(false);
  result.increment();
  expect(useState.mock.results[0].value[1].mock.calls[0]).toEqual([11]);
  result.decrement();
  expect(useState.mock.results[0].value[1].mock.calls[1]).toEqual([0]);
  result.setOffset(0);
  expect(useState.mock.results[0].value[1].mock.calls.length).toEqual(3);
  result.setPageSize();
  expect(useState.mock.results[1].value[1].mock.calls.length).toEqual(1);
  result.setLastPage();
  expect(useState.mock.results[2].value[1].mock.calls.length).toEqual(1);
});
