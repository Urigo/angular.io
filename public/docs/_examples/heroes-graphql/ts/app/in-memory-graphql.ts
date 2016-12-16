// #docregion
// #docregion import-lodash
import { find, filter } from 'lodash';
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

  addHero (
    heroName: String!
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
// #enddocregion heroes-array

// #docregion resolvers
const resolveFunctions = {
  Query: {
    heroes() {
      return heroes;
    },
    hero(obj: any, args: any, context: any) {
      return find(heroes, { id: args.heroId });
    }
  },
  Mutation: {
    updateHero(root: any, args: any) {
      let hero = find(heroes, { id: args.heroId });
      if (!hero) {
        throw new Error(`Couldn't find post with id ${args.heroId}`);
      }
      hero = args.heroId;
      return hero;
    },
    addHero(root: any, args: any) {
      const maxId = Math.max(...heroes.map((hero)=>{return hero.id}));
      const newHero = {
        name: args.heroName,
        id: maxId + 1
      };
      heroes.push(newHero);
      return(newHero);
    }
  }
}
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

export const networkInterface = new InBrowserNetworkInterface({ schema });
// #enddocregion execute-and-export
// #enddocregion