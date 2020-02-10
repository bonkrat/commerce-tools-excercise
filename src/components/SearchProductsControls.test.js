import React from "react";
import { shallow } from "enzyme";
import SearchProductsControls from "./SearchProductsControls";
import SearchProductsInput from "./SearchProductsInput";
import PagingControls from "./PagingControls";

jest.mock("../containers/PagingContainer", () => ({
  useContainer: jest.fn(() => ({ foo: "bar" }))
}));

const wrapper = shallow(<SearchProductsControls />);

it("renders an input for searching for products", () => {
  expect(wrapper.find(SearchProductsInput).exists()).toBeTruthy();
});

it("renders controls for paging through data", () => {
  const pagingControlsWrapper = wrapper.find(PagingControls);
  expect(pagingControlsWrapper.exists()).toBeTruthy();
  expect(pagingControlsWrapper.prop("foo")).toEqual("bar");
});
