// #docregion
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { networkInterface } from './in-memory-graphql';

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (object:any) => object.id,
});
export {
  client
}
// #enddocregion