// #docregion
import { find, filter } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

// #docregion graphql-schema
const typeDefinitions = `
type Hero {
  id: Int!
  name: String
}

# the schema allows the following query:
type Query {
  heroes: [Hero]

  hero(heroId: Int!): Hero
}

# this schema allows the following mutation:
type Mutation {
  updateHero (
    heroId: Int!
  ): Hero
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
  mutation: Mutation
}
`;
// #enddocregion graphql-schema

const heroes = [
  {id: 11, name: 'Mr. Nice'},
  {id: 12, name: 'Narco'},
  {id: 13, name: 'Bombasto'},
  {id: 14, name: 'Celeritas'},
  {id: 15, name: 'Magneta'},
  {id: 16, name: 'RubberMan'},
  {id: 17, name: 'Dynama'},
  {id: 18, name: 'Dr IQ'},
  {id: 19, name: 'Magma'},
  {id: 20, name: 'Tornado'}
];

const resolveFunctions = {
  Query: {
    heroes() {
      return heroes;
    },
    hero(obj: any, params: any, context: any) {
      return find(heroes, { id: params.heroId });
    }
  },
  Mutation: {
    // updateHero(root: any, params: any) {
    //   const post = find(posts, { id: params.postId });
    //   if (!post) {
    //     throw new Error(`Couldn't find post with id ${params.postId}`);
    //   }
    //   post.votes += 1;
    //   return post;
    // }
  }
}

const schema = makeExecutableSchema({
  typeDefs: typeDefinitions,
  resolvers: resolveFunctions,
});

// in-browser-network-interface.js
import { execute } from 'graphql';

class InBrowserNetworkInterface {
  schema: any = {};
  constructor(params: any) {
    this.schema = params.schema;
  }

  query(request: any) {
    return execute(
      this.schema,
      request.query,
      {},
      {},
      request.variables,
      request.operationName);
  }
}

export const networkInterface = new InBrowserNetworkInterface({ schema });
// #enddocregion