import PagingContainer from "./PagingContainer";
import usePaging from "../hooks/usePaging";
import { createContainer } from "unstated-next";

jest.mock("unstated-next", () => ({
  createContainer: jest.fn()
}));

it("creates a state container from the paging hook", () => {
  expect(createContainer).toHaveBeenCalledWith(usePaging);
});
