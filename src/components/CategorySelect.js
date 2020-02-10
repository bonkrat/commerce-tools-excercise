import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const CATEGORIES_QUERY = gql`
  query CategoriesQuery {
    categories {
      results {
        name(locale: "en")
      }
    }
  }
`;

/**
 * UNTESTED/UNUSED COMPONENT!!!
 *
 * Creates a dropdown of categories to choose from.
 */
const CategorySelect = () => {
  const { loading, error, data } = useQuery(CATEGORIES_QUERY);

  //TODO: Loading and Error States
  if (data) {
    const {
      categories: { results }
    } = data;

    return (
      <select
        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-state"
      >
        <option>All</option>
        {results.map(category => (
          <option>{category.name}</option>
        ))}
      </select>
    );
  }

  return <div></div>;
};

export default CategorySelect;
