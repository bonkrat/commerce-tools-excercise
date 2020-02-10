import React from "react";
import SearchProductsControls from "../components/SearchProductsControls";
import ProductsList from "../components/ProductsList";

/**
 * Renders a view of product data as a table, controls to filter and page through them.
 */
export default () => (
  <div className="container mx-auto mb-4">
    <SearchProductsControls />
    <ProductsList />
  </div>
);
