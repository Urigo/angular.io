// #docregion
// #docregion import-lodash
import * as _ from 'lodash';
// #enddocregion import-lodash
// #docregion import-graphql-tools
import { makeExecutableSchema } from 'graphql-tools';
// #enddocregion import-graphql-tools
// #docregion import-graphql
import { execute } from 'graphql';
// #enddocregion import-graphql
// #docregion graphql-schema
const typeDefinitions = `
type Hero {
  id: Int!
  name: String!
}

# the schema allows the following query:
type Query {
  heroes(search: String): [Hero]

  hero(heroId: Int!): Hero
}

# this schema allows the following mutation:
type Mutation {
  updateHero (
    id: Int!
    name: String!
  ): Hero

  addHero (
    heroName: String!
  ): Hero

  deleteHero (
    id: Int!
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
// #docregion heroes-array
let heroes = [
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
// #enddocregion heroes-array

// #docregion resolvers
const resolveFunctions = {
  Query: {
    heroes(obj: any, args: any) {
      if (args.search) {
        return heroes.filter(function (currentHero){
          return currentHero.name.toLowerCase().search(args.search.toLowerCase()) !== -1;
        });
      } else {
        return heroes;
      }
    },
    hero(obj: any, args: any, context: any) {
      return _.find(heroes, { id: args.heroId });
    }
  },
  Mutation: {
    updateHero(root: any, args: any) {
      let hero = _.find(heroes, { id: args.id });
      if (!hero) {
        throw new Error(`Couldn't find post with id ${args.id}`);
      }
      hero.name = args.name;
      return hero;
    },
    addHero(root: any, args: any) {
      const maxId = Math.max(...heroes.map((hero) => {return hero.id; }));
      const newHero = {
        name: args.heroName,
        id: maxId + 1
      };
      heroes.push(newHero);
      return newHero;
    },
    deleteHero(root: any, args: any) {
      let hero = _.find(heroes, { id: args.id });
      if (!hero) {
        throw new Error(`Couldn't find post with id ${args.id}`);
      }
      heroes = heroes.filter(function (currentHero) { return currentHero.id !== args.id; });
      return hero;
    },
  }
};
// #enddocregion resolvers
// #docregion make-executable-schema
const schema = makeExecutableSchema({
  typeDefs: typeDefinitions,
  resolvers: resolveFunctions,
});
// #enddocregion make-executable-schema
// #docregion execute-and-export
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

const networkInterface = new InBrowserNetworkInterface({ schema });
export {
  networkInterface
}
// #enddocregion execute-and-export
// #enddocregion
