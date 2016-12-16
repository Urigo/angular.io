// #docregion , network-initialization
import ApolloClient, { createNetworkInterface } from 'apollo-client';

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://my-api.graphql.com'
  })
});
// #enddocregion network-initialization
