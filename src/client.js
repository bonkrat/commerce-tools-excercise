import ApolloClient from "apollo-boost";

// I would never store this in this way!!!

//   curl https://auth.us-central1.gcp.commercetools.com/oauth/token
// --basic
// --user "C00oOxN3OEqDTMUjL0DoCjly:KlC0LVHXN6r55dVo9IyVetiHikH9QoMg"
// -X POST
// -d "grant_type=client_credentials&scope=manage_project:interview"

export default new ApolloClient({
  uri: "https://api.us-central1.gcp.commercetools.com/interview/graphql",
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer oojig3YkX5DXlaWxmIJAdVk4E--JHyn9` // TODO put this somewhere more safe
      }
    });
  }
});
