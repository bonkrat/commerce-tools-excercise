import React from "react";
import PagingControls from "./PagingControls";
import { shallow } from "enzyme";

const pagingProps = {
  pageNumber: 1,
  increment: jest.fn(),
  decrement: jest.fn(),
  lastPage: false
};

const wrapper = shallow(<PagingControls {...pagingProps} />);

afterEach(() => {
  pagingProps.increment.mockClear();
  pagingProps.decrement.mockClear();
});

it("displays the page number", () => {
  expect(wrapper.findWhere(n => n.text() === "1").exists()).toBeTruthy();
});

it("pages back when the decrement button is clicked", () => {
  const prevButtonWrapper = wrapper.findWhere(
    n => n.text() === "Prev" && n.type() === "button"
  );

  expect(pagingProps.decrement).not.toHaveBeenCalled();
  prevButtonWrapper.prop("onClick")();
  expect(pagingProps.decrement).toHaveBeenCalled();
});

it("pages forward when the increment button is hit and it is not the last page", () => {
  const nextButtonWrapper = wrapper.findWhere(
    n => n.text() === "Next" && n.type() === "button"
  );
  expect(pagingProps.increment).not.toHaveBeenCalled();
  nextButtonWrapper.prop("onClick")();
  expect(pagingProps.increment).toHaveBeenCalled();
});

it("does not page forward if it is the last page", () => {
  const newPagingProps = {
    ...pagingProps,
    lastPage: true
  };
  const wrapper = shallow(<PagingControls {...newPagingProps} />).findWhere(
    n => n.text() === "Next" && n.type() === "button"
  );
  expect(newPagingProps.increment).not.toHaveBeenCalled();
  wrapper.prop("onClick")();
  expect(newPagingProps.increment).not.toHaveBeenCalled();
});
