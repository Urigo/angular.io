// #docregion
// #docregion import-lodash
import { find as lodashFind } from 'lodash';
// #enddocregion import-lodash
// #docregion import-graphql-tools
import { makeExecutableSchema } from 'graphql-tools';
// #enddocregion import-graphql-tools
// #docregion import-graphql
import { GraphQLSchema, execute } from 'graphql';
import {
  Hero,
  HeroQueryArgs,
  HeroesQueryArgs,
  UpdateHeroMutationArgs,
  AddHeroMutationArgs,
  DeleteHeroMutationArgs,
} from './graphql-types';
// #enddocregion import-graphql
// #docregion graphql-schema
import { typeDefinitions } from './graphql-typesdef';
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
    heroes(obj: any, args: HeroesQueryArgs): Hero[] {
      if (args.search) {
        return heroes.filter(function (currentHero){
          return currentHero.name.toLowerCase().search(args.search.toLowerCase()) !== -1;
        });
      } else {
        return heroes;
      }
    },
    hero(obj: any, args: HeroQueryArgs): Hero {
      return lodashFind(heroes, { id: args.heroId });
    }
  },
  Mutation: {
    updateHero(root: any, args: UpdateHeroMutationArgs): Hero {
      let hero = lodashFind(heroes, { id: args.id });
      if (!hero) {
        throw new Error(`Couldn't find post with id ${args.id}`);
      }
      hero.name = args.name;
      return hero;
    },
    addHero(root: any, args: AddHeroMutationArgs): Hero {
      const maxId = Math.max(...heroes.map((hero) => {return hero.id; }));
      const newHero = {
        name: args.heroName,
        id: maxId + 1
      };
      heroes.push(newHero);
      return newHero;
    },
    deleteHero(root: any, args: DeleteHeroMutationArgs): Hero {
      let hero = lodashFind(heroes, { id: args.id });
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
  schema: GraphQLSchema;
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

export {schema};
