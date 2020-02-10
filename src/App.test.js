import React from "react";
import App from "./App";
import client from "./client";
import { shallow } from "enzyme";
import QueryPredicate from "./containers/QueryPredicateContainer";
import { ApolloProvider } from "@apollo/react-hooks";
import Paging from "./containers/PagingContainer";
import { Route } from "react-router-dom";
import ProductView from "./pages/ProductPage";
import Home from "./pages/HomePage";

describe("Providers", () => {
  let wrapper = shallow(<App />);
  it("provides Apollo context", () => {
    const apolloWrapper = wrapper.find(ApolloProvider);
    expect(apolloWrapper.exists()).toBeTruthy();
    expect(apolloWrapper.prop("client")).toBe(client);
  });
  it("provides paging context", () => {
    expect(wrapper.find(Paging.Provider).exists()).toBeTruthy();
  });
  it("provides query predicate context", () => {
    expect(wrapper.find(QueryPredicate.Provider).exists()).toBeTruthy();
  });
});

describe("Routes", () => {
  let wrapper = shallow(<App />);
  it("provides a product view route", () => {
    const routeWrapper = wrapper.findWhere(
      n => n.prop("path") === "/:productId"
    );
    expect(routeWrapper.exists()).toBeTruthy();
    expect(routeWrapper.type()).toBe(Route);
    expect(routeWrapper.find(ProductView).exists()).toBeTruthy();
  });
  it("provides a home route", () => {
    const homeWrapper = wrapper.findWhere(n => n.prop("path") === "/");
    expect(homeWrapper.exists()).toBeTruthy();
    expect(homeWrapper.type()).toBe(Route);
    expect(homeWrapper.find(Home).exists()).toBeTruthy();
  });
});
