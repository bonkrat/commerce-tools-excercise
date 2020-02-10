import React from "react";
import { shallow } from "enzyme";
import ProductRow from "./ProductRow";
import { useHistory } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(() => ({
    push: jest.fn()
  }))
}));

jest.mock("moment", () =>
  jest.fn(() => ({
    format: jest.fn()
  }))
);

const props = {
  index: 1,
  id: "123",
  name: "foo",
  productType: "bar",
  published: true,
  categories: [{ name: "baz" }, { name: "qix" }],
  createdAt: "1581275037807"
};

let wrapper;
beforeEach(() => {
  wrapper = shallow(<ProductRow {...props} />);
});

it("redirects to the product view when clicked", () => {
  wrapper.prop("onClick")();
  expect(useHistory.mock.results[0].value.push.mock.calls[0]).toEqual(["/123"]);
});

it("alternates the background color", () => {
  expect(wrapper.prop("className")).toEqual(
    "bg-gray-100 cursor-pointer hover:bg-gray-200"
  );
  wrapper.setProps({
    ...props,
    index: 2
  });
  expect(wrapper.prop("className")).toEqual("cursor-pointer hover:bg-gray-200");
});

it("displays product data", () => {
  expect(wrapper.findWhere(n => n.text() === "foo").exists()).toBeTruthy();
  expect(wrapper.findWhere(n => n.text() === "bar").exists()).toBeTruthy();
  expect(
    wrapper.findWhere(n => n.text() === "Published").exists()
  ).toBeTruthy();
  expect(wrapper.findWhere(n => n.text() === "baz, qix").exists()).toBeTruthy();
});

it("displays unpublished when the product is not published", () => {
  wrapper.setProps({
    ...props,
    published: false
  });
  expect(
    wrapper.findWhere(n => n.text() === "Unpublished").exists()
  ).toBeTruthy();
});
