import React from "react";
import Routes from "./Routes/Routes";

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  HttpLink,
  from,
  ApolloProvider,
} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

import {onError} from "@apollo/client/link/error";
import {graphqlUri} from "./api/Consts";
import {getJwtToken} from "./utils/Auth";

const errorLink = onError(({graphqlError, newtworkError}) => {
  if (graphqlError) {
    graphqlError.map(({message, location, path}) => {
      alert(`graphql error ${message}`);
    });
  }
});

const httpLink = createHttpLink({
  uri: graphqlUri,
});

const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = getJwtToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  link: authLink.concat(httpLink),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <>
        <Routes />
      </>
    </ApolloProvider>
  );
};

export default App;
