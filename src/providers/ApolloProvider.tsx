import React from 'react';

import fetch from 'cross-fetch';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  HttpLink,
} from '@apollo/client';

const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const link = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    credentials: 'same-origin',

    fetch,
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });

  return <Provider client={client}>{children}</Provider>;
};

export default ApolloProvider;
