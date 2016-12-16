// #docregion
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { networkInterface } from './in-memory-graphql';

export const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (object:any) => object.id,
});
// #enddocregion