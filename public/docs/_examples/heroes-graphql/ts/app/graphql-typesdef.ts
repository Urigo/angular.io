// #docregion graphql-schema
export const typeDefinitions = `
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
