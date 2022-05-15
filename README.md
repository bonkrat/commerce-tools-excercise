Interview project - I don't think they ever looked at it. If you're interviewing for commercetools... just spend your time elsewere. I tried way too hard on this.


# commercetools Excercise

![Node.js CI](https://github.com/rjernigan/commerce-tools-excercise/workflows/Node.js%20CI/badge.svg?branch=master)

A prototype application for searching products in the commercetools GraphQL API.

### Installing

`npm install`

The application uses:

- `create-react-app` for generating the initial code.
- `apollo-client` for fetching and storing data.
- `unstated` for sharing application state between components.
- `tailwindcss` for utility CSS classes.
- `jest` and `enzyme` for unit testing.

### Running the Dev Server

`npm run start`

Right now the authorization token is hardcoded. Let me know if you are getting failures, I can generate a new key, or you can run this command to get a new one to place in `client.js`. 😅

```
curl https://auth.us-central1.gcp.commercetools.com/oauth/token --basic --user "C00oOxN3OEqDTMUjL0DoCjly:KlC0LVHXN6r55dVo9IyVetiHikH9QoMg" -X POST -d "grant_type=client_credentials&scope=manage_project:interview"
```

### Running Tests

`npm run test`

Currently there are unit tests for all components, hooks, and pages, which run in `jest`

## Challenges

### TailwindCSS

Starting with a library I had never used added a learning curve. Near the end I felt more comfortable, but there are still parts of the application that I do not think are using the utility classes correctly.

### commercetools GraphQL Search Predicates

Using the Query Predicates with a GraphQL query, specifically

```
products(where:"masterData(current(categories(name=\"Some Name\")))") {
    // "Malformed parameter: where: The field 'name' does not exist."
```

I spent way too long trying to figure out how to filter and search the GraphQL API with the search predicate syntax, where sometimes it would work and sometimes it wouldn't. I created a component for filtering by category (`CategorySelect.js`), but didn't end up using it because I couldn't get the query mentioned above to work.

I was able to get searching by product name to work, but \*I\*\* was also not quite able to figure out how to do a fuzzy match with the GraphQL API. The search in the application is an exact match search.

### Mocking Dependencies

There are a lot of unit tests, and mocking some of the dependencies ended up being trickier than I was hoping.

## Proud 👍

- The application has a lot of unit test coverage, which took a bulk of time to write. I tried to make the unit tests as pure as possible, so they only use `shallow` and mock as much as possible. I am particularly proud of the unit tests in `SearchProductsInput.test.js`, where `react` is partially mocked and `useState` is overridden.
- This was one of the first times I've created custom React hooks that went into use.
- Finally got to try out the [existential operator](https://github.com/tc39/proposal-optional-chaining)!
- This was also the first time checking out [tailwind-css](https://tailwindcss.com). I ended up really liking its simplicty and how quickly you can prototype with it.
- Setting up GitHub actions was fun!

## Not Proud 👎

- Some of the components could be isolated better.
- Searching is exact search only.
- The images for product pages jumps in instead of loading gracefully.
- Tailwind classes feel sloppy and could probably be managed better as components or some kind of provider.
- Handling dates with `moment` is pretty sloppy.

## Tradeoffs

- Using a hardcoded authorization token. And the `.env` file.
- No code splitting. I wanted to try out React Suspense and `React.lazy`.
- Integration and End-to-end tests.
- Wanted to try out the React Context API without any extra dependencies, but ended up pulling in `unstated` to save some time.
- Paging is pretty basic, and there's an obvious bug that needs to be fixed.
- I didn't style any error states.
- The UX could use love.
