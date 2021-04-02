import { IResolvers } from "graphql-tools";
import mutation from "./mutation";
import query from "./query";

// proporciona las respuestas a los query que le hemos definido
const resolvers: IResolvers = {
  ...query,
  ...mutation,
};

export default resolvers;
