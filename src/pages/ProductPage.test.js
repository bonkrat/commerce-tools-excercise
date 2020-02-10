import React from "react";
import ProductPage, { PRODUCT_QUERY } from "./ProductPage";
import { shallow } from "enzyme";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import LinearProgress from "@material/react-linear-progress";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(() => ({ productId: "foo" })),
  useHistory: jest.fn(() => ({
    push: jest.fn()
  }))
}));

jest.mock("@apollo/react-hooks", () => ({
  useQuery: jest.fn(() => ({
    loading: true,
    error: false,
    data: []
  }))
}));

describe("ProductPage", () => {
  afterEach(() => {
    useQuery.mockReset();
  });
  shallow(<ProductPage />);
  it("queries for a products data", () => {
    expect(useQuery).toHaveBeenCalledWith(PRODUCT_QUERY, {
      variables: { id: "foo" }
    });
  });
  it("redirects if there is an error while querying for data", () => {
    expect(useHistory).toHaveBeenCalled();
    useQuery.mockImplementation(() => ({
      loading: false,
      error: true,
      data: []
    }));
    shallow(<ProductPage />);
    expect(useHistory.mock.results[1].value.push.mock.calls[0]).toEqual(["/"]);
  });
  it("shows a progress indicator while loading", () => {
    useQuery.mockImplementation(() => ({
      loading: true,
      error: false,
      data: []
    }));
    const wrapper = shallow(<ProductPage />);
    expect(wrapper.find(LinearProgress).prop("className")).toEqual(
      "opacity-100"
    );
  });
  it("renders a back button to the product list", () => {
    useQuery.mockImplementation(() => ({
      loading: false,
      error: false,
      data: []
    }));

    const wrapper = shallow(<ProductPage />).findWhere(
      n => n.text() === "Back to Product Search" && n.type() === "button"
    );
    expect(wrapper.exists()).toBeTruthy();
    wrapper.prop("onClick")();
    expect(useHistory.mock.results[1].value.push.mock.calls[0]).toEqual(["/"]);
  });

  [
    ["name", "fooname"],
    ["slug", "fooslug"],
    ["date", "February 9th 2020, 7:03:57 pm"],
    ["tag", "#foocategory"]
  ].forEach(([name, text]) => {
    it(`renders the ${name} value for the product`, () => {
      useQuery.mockImplementation(() => ({
        loading: false,
        error: false,
        data: {
          product: {
            createdAt: 1581275037807,
            masterData: {
              current: {
                name: "fooname",
                slug: "fooslug",
                categories: [
                  {
                    name: "foocategory"
                  }
                ]
              }
            }
          }
        }
      }));

      const wrapper = shallow(<ProductPage />);
      expect(wrapper.findWhere(n => n.text() === text).exists()).toBeTruthy();
    });
  });
});

describe("PRODUCT_QUERY", () => {
  it("queries for product data", () => {
    expect(PRODUCT_QUERY).toMatchSnapshot();
  });
});
