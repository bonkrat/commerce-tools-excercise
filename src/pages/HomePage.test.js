import React from "react";
import SearchProductsControls from "../components/SearchProductsControls";
import ProductsList from "../components/ProductsList";
import HomePage from "./HomePage";
import { shallow } from "enzyme";

let wrapper = shallow(<HomePage />);

test("renders search controls", () => {
  expect(wrapper.find(SearchProductsControls).exists()).toBeTruthy();
});

test("renders a list of products", () => {
  expect(wrapper.find(ProductsList).exists()).toBeTruthy();
});
