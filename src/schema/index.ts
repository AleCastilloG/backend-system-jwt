import { GraphQLSchema } from "graphql";
// muy importante para tratar el contenido de un fichero con extensión graphql
import "graphql-import-node";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "./schema.graphql";
import resolvers from "../resolvers/resolversMap";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
