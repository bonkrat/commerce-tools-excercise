import useQueryPredicate from "./useQueryPredicate";
import { useState } from "react";

jest.mock("react", () => ({
  useState: jest.fn(initialState => [initialState, jest.fn()])
}));

it("provides query predicate state and handlers", () => {
  const result = useQueryPredicate("foobar");
  expect(result.queryPredicate).toEqual("foobar");
  result.setQueryPredicate("barfoo");
  expect(useState.mock.results[0].value[1].mock.calls[0]).toEqual([
    'masterData(current(name(en=\\"barfoo\\")))'
  ]);
});
