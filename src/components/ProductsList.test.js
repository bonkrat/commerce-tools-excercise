import React from "react";
import ProductsList, {
  PlaceholderRows,
  Table,
  buildProductsQuery
} from "./ProductsList";
import { shallow } from "enzyme";
import { useQuery } from "@apollo/react-hooks";
import Paging from "../containers/PagingContainer";
import QueryPredicate from "../containers/QueryPredicateContainer";
import LinearProgress from "@material/react-linear-progress";
import ProductRow from "./ProductRow";
import { times } from "lodash";

jest.mock("../containers/PagingContainer", () => ({
  useContainer: jest.fn(() => ({
    offset: 0,
    pageSize: 10,
    setLastPage: jest.fn()
  }))
}));

jest.mock("../containers/QueryPredicateContainer", () => ({
  useContainer: jest.fn(() => ({
    queryPredicate: "foopredicate"
  }))
}));

jest.mock("@apollo/react-hooks", () => ({
  useQuery: jest.fn(() => ({
    loading: false,
    error: false,
    data: {
      products: {
        results: [
          {
            id: "foo",
            createdAt: "12345",
            productType: {
              name: "bar"
            },
            masterData: {
              published: true,
              current: {}
            }
          }
        ]
      }
    }
  }))
}));

describe("buildProductsQuery", () => {
  it("builds a query for searching products", () => {
    expect(buildProductsQuery("foobar", 5, 5)).toMatchSnapshot();
  });
});

describe("PlaceholderRow", () => {
  it("prints a page of placeholder rows", () => {
    expect(shallow(<PlaceholderRows pageSize={5} />).find("td").length).toBe(
      25
    );
  });
  it("sets the background color on the rows", () => {
    const wrapper = shallow(<PlaceholderRows pageSize={5} />).find("tr");
    times(5, index => {
      if (index % 2) {
        expect(wrapper.at(index).prop("className")).toBe("bg-gray-100");
      } else {
        expect(wrapper.at(index).prop("className")).toBe("");
      }
    });
  });
});

describe("Table", () => {
  it("renders children", () => {
    expect(
      shallow(<Table>{["foobar"]}</Table>)
        .findWhere(n => n.text() === "foobar")
        .exists()
    ).toBeTruthy();
  });
});

describe("ProductsList", () => {
  afterEach(() => {
    useQuery.mockClear();
    Paging.useContainer.mockClear();
    QueryPredicate.useContainer.mockClear();
  });

  it("prints rows of data", () => {
    const wrapper = shallow(<ProductsList />);
    expect(wrapper.find(ProductRow).props()).toMatchObject({
      index: 0,
      createdAt: "12345",
      id: "foo",
      productType: "bar",
      published: true
    });
  });

  it("builds a product query", () => {
    shallow(<ProductsList />);
    expect(useQuery).toHaveBeenCalledWith(
      buildProductsQuery("foopredicate", 0, 10)
    );
  });

  it("sets the last page if there is no more paging data", () => {
    Paging.useContainer.mockImplementation(() => ({
      offset: 0,
      pageSize: 1,
      setLastPage: jest.fn()
    }));

    shallow(<ProductsList />);

    expect(
      Paging.useContainer.mock.results[0].value.setLastPage
    ).toHaveBeenCalledWith(false);

    Paging.useContainer.mockReset();

    Paging.useContainer.mockImplementation(() => ({
      offset: 0,
      pageSize: 25,
      setLastPage: jest.fn()
    }));

    shallow(<ProductsList />);

    expect(
      Paging.useContainer.mock.results[0].value.setLastPage
    ).toHaveBeenCalledWith(true);
  });

  it("shows a message if there is an error", () => {
    useQuery.mockImplementation(() => ({
      loading: false,
      error: true,
      data: { products: { results: [] } }
    }));

    const wrapper = shallow(<ProductsList />);
    expect(
      wrapper.findWhere(n => n.text() === "There was an error").exists()
    ).toBeTruthy();
  });

  it("shows a loading indicator when fetching data", () => {
    useQuery.mockImplementation(() => ({
      loading: true,
      error: false,
      data: {
        products: {
          results: [
            {
              id: "foo",
              createdAt: "12345",
              productType: {
                name: "bar"
              },
              masterData: {
                published: true,
                current: {}
              }
            }
          ]
        }
      }
    }));

    const wrapper = shallow(<ProductsList />);
    expect(wrapper.find(LinearProgress).prop("className")).toBe("opacity-100");
    expect(wrapper.find(LinearProgress).prop("indeterminate")).toBeTruthy();
    expect(wrapper.find(PlaceholderRows).exists()).toBeTruthy();
    expect(wrapper.find(PlaceholderRows).prop("pageSize")).toBe(25);
  });
});
