import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import LinearProgress from "@material/react-linear-progress";
import moment from "moment";

export const PRODUCT_QUERY = gql`
  query getProduct($id: String!) {
    product(id: $id) {
      id
      createdAt
      masterData {
        current {
          name(locale: "en")
          slug(locale: "en")
          categories {
            name(locale: "en")
          }
        }
      }
    }
  }
`;

/**
 * Creates a view with a product card.
 */
export default () => {
  const history = useHistory();
  const { productId: id } = useParams();
  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: { id }
  });

  // Redirect if there is an error
  error && history.push("/");

  return (
    <div className="container mx-auto mb-6 w-1/2">
      <LinearProgress
        indeterminate
        className={loading ? "opacity-100" : "opacity-0"}
      />
      <button
        class="mb-4 w-full bg-blue-300 hover:bg-blue-400 text-gray-100 font-bold py-2 px-4 rounded-l"
        onClick={() => history.push("/")}
      >
        Back to Product Search
      </button>
      {!loading && (
        <div class="rounded overflow-hidden shadow-lg min-h-16">
          <img
            class="w-full bg-gray-100"
            src="https://placedog.net/250?random"
            alt="Product Placeholder"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">
              {data?.product?.masterData?.current?.name}
            </div>
            <div class="font-italics text-s mb-2">
              {data?.product?.masterData?.current?.slug}
            </div>
            <div class="font-italics text-s mb-2">
              {data?.product?.createdAt &&
                moment
                  .utc(data.product.createdAt)
                  .format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </div>
          <div class="px-6 py-4">
            {data?.product?.masterData?.current?.categories?.map(category => (
              <span
                key={category.name}
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                #{category?.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
