import PagingContainer from "./QueryPredicateContainer";
import useQueryPredicate from "../hooks/useQueryPredicate";
import { createContainer } from "unstated-next";

jest.mock("unstated-next", () => ({
  createContainer: jest.fn()
}));

it("creates a state container from the paging hook", () => {
  expect(createContainer).toHaveBeenCalledWith(useQueryPredicate);
});
