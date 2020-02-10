import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useHistory } from "react-router-dom";

/**
 * Renders a table row of product data.
 */
const ProductRow = ({
  index,
  id,
  name,
  productType,
  published,
  categories,
  createdAt
}) => {
  const history = useHistory();
  const coloredRowClass = index % 2 ? "bg-gray-100 " : "";
  return (
    <tr
      className={coloredRowClass + "cursor-pointer hover:bg-gray-200"}
      onClick={() => history.push("/" + id)}
    >
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">{productType}</td>
      <td className="border px-4 py-2">
        {published ? "Published" : "Unpublished"}
      </td>
      <td className="border px-4 py-2">
        {categories.reduce((acc, curr) => {
          acc = acc.length ? (acc += ", " + curr.name) : curr.name;
          return acc;
        }, "")}
      </td>
      <td className="border px-4 py-2">
        {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </td>
    </tr>
  );
};

ProductRow.propTypes = {
  /**
   * The index of the current row. Controls the background color of the row.
   */
  index: PropTypes.number,
  /**
   * The id of the product.
   */
  id: PropTypes.string,
  /**
   * The name of the product.
   */
  name: PropTypes.string,
  /**
   * The type of product.
   */
  productType: PropTypes.string,
  /**
   * Whether the product is published.
   */
  published: PropTypes.bool,
  /**
   * The categories assigned to the product.
   */
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The name of the category.
       */
      name: PropTypes.string
    })
  ),
  /**
   * The creation date of the product.
   */
  createdAt: PropTypes.string
};

export default ProductRow;
