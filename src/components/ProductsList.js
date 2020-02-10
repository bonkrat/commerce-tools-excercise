import React from "react";
import PropTypes from "prop-types";
import ProductRow from "./ProductRow";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Paging from "../containers/PagingContainer";
import QueryPredicate from "../containers/QueryPredicateContainer";
import LinearProgress from "@material/react-linear-progress";
import { times } from "lodash";

/**
 * Builds a search query for the commercetools GraphQL API.
 *
 * @param {string} predicate The search query predicate for searching for results with the GraphQL query.
 * @param {number} offset The paging offset (pageNumber).
 * @param {number} limit The number of results (pageSize).
 */
export const buildProductsQuery = (predicate, offset, limit) => gql`
  query ProductsQuery {
    products (offset: ${offset}, limit: ${limit}, ${
  predicate ? `where:"${predicate}"` : ""
} ){
      total
      results {
        id
        createdAt
        productType {
          name
        }
        masterData {
          published
          current {
            name(locale: "en")
            description(locale: "en")
            categories {
              name(locale: "en")
            }
          }
        }
      }
    }
  }
`;

/**
 * Placeholder rows for display while the table is loading.
 */
export const PlaceholderRows = ({ pageSize }) =>
  times(pageSize, index => (
    <tr key={index} className={`${index % 2 ? "bg-gray-100" : ""}`}>
      <td className="border px-4 py-6"></td>
      <td className="border px-4 py-6"></td>
      <td className="border px-4 py-6"></td>
      <td className="border px-4 py-6"></td>
      <td className="border px-4 py-6"></td>
    </tr>
  ));

PlaceholderRows.propTypes = {
  /**
   * The number of items displayed in the table page.
   */
  pageSize: PropTypes.number
};

/**
 * A table of product results.
 */
export const Table = ({ children }) => (
  <table className="table-fixed bg-white w-full">
    <thead className="bg-gray-100">
      <tr>
        <th className="w-1/4 px-4 py-2">Product Name</th>
        <th className="w-1/16 px-4 py-2">Product Type</th>
        <th className="w-1/16 px-4 py-2">Status</th>
        <th className="w-1/4 px-4 py-2">Categories</th>
        <th className="w-1/4 px-4 py-2">Created</th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

Table.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node])
};

/**
 * Displays a table of product data by querying the commercetools GraphQL API.
 */
export default () => {
  const { offset, pageSize, setLastPage } = Paging.useContainer();
  const { queryPredicate } = QueryPredicate.useContainer();
  const { loading, error, data } = useQuery(
    buildProductsQuery(queryPredicate, offset, pageSize)
  );

  // Bug included if pageSize is the last page is the length of pageSize.
  data?.products?.results?.length < pageSize
    ? setLastPage(true)
    : setLastPage(false);

  return (
    <React.Fragment>
      {error && "There was an error"}
      <LinearProgress
        indeterminate
        className={loading ? "opacity-100" : "opacity-0"}
      />
      <Table>
        {loading ? (
          <PlaceholderRows pageSize={pageSize} />
        ) : (
          data?.products?.results.map((product, index) => {
            const {
              id,
              createdAt,
              productType: { name: productType },
              masterData: { published, current }
            } = product;
            return (
              <ProductRow
                index={index}
                key={id}
                id={id}
                productType={productType}
                createdAt={createdAt}
                published={published}
                {...current}
              />
            );
          })
        )}
      </Table>
    </React.Fragment>
  );
};
