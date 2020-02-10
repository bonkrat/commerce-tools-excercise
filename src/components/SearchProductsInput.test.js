import React, { useState } from "react";
import { shallow } from "enzyme";
import SearchProductsInput from "./SearchProductsInput";
import { debounce } from "lodash";
import QueryPredicate from "../containers/QueryPredicateContainer";
import Paging from "../containers/PagingContainer";

jest.mock("lodash", () => ({
  debounce: jest.fn(() => jest.fn())
}));

jest.mock("../containers/PagingContainer", () => ({
  useContainer: jest.fn(() => ({
    setOffset: jest.fn()
  }))
}));

jest.mock("../containers/QueryPredicateContainer", () => ({
  useContainer: jest.fn(() => ({
    setQueryPredicate: jest.fn()
  }))
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(() => ["foo", jest.fn(() => {})])
}));

afterEach(() => {
  debounce.mockClear();
});

it("sets the text input when the user types", () => {
  const wrapper = shallow(<SearchProductsInput />).find("input");
  wrapper.prop("onChange")({
    target: {
      value: "foo"
    }
  });
  expect(useState).toHaveBeenCalled();
  expect(useState.mock.results[0].value[1]).toHaveBeenCalledWith("foo");
});

it("debounces setting the query search predicate and offset when the user searches", () => {
  const wrapper = shallow(<SearchProductsInput />).find("input");
  wrapper.prop("onChange")({
    target: {
      value: "foo"
    }
  });
  expect(QueryPredicate);
  expect(debounce).toHaveBeenCalled();
  const debounceCallback = debounce.mock.calls[0][0];
  debounceCallback("foo");
  expect(
    QueryPredicate.useContainer.mock.results[1].value.setQueryPredicate
  ).toHaveBeenCalledWith("foo");
  expect(
    Paging.useContainer.mock.results[1].value.setOffset
  ).toHaveBeenCalledWith(0);
});
