import React from "react";
import client from "./client";
import { ApolloProvider } from "@apollo/react-hooks";
import QueryPredicate from "./containers/QueryPredicateContainer";
import Paging from "./containers/PagingContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductPage";

export default () => (
  <ApolloProvider client={client}>
    <Paging.Provider>
      <QueryPredicate.Provider>
        <Router>
          <Switch>
            <Route path="/:productId">
              <ProductsPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </QueryPredicate.Provider>
    </Paging.Provider>
  </ApolloProvider>
);
