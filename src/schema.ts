import { makeSchema } from "nexus";
import { join } from "path";
import {
  ExpenseMutation,
  ExpenseQuery,
  ExpenseSubscription,
} from "./graphql/expense";
import { transformSchemaFederation } from "graphql-transform-federation";
import { Node, User } from "./graphql/expense/types";
import { GraphQLUpload } from "graphql-upload";
import { DateTimeResolver, ObjectIDResolver } from "graphql-scalars";

const schema = makeSchema({
  types: [
    Node,
    User,
    GraphQLUpload,
    DateTimeResolver,
    ObjectIDResolver,
    ExpenseQuery,
    ExpenseMutation,
    ExpenseSubscription,
  ],
  outputs: {
    typegen: join(__dirname, "generated", "typegen.ts"),
    schema: join(__dirname, "generated", "schema.graphql"),
  },
  contextType: {
    module: join(__dirname, "./utils/buildContext.ts"),
    export: "Context",
  },
});

export const federatedSchema = transformSchemaFederation(schema, {
  Query: {
    extend: true,
  },
  Mutation: {
    extend: true,
  },
  Subscription: {
    extend: true,
  },
  User: {
    extend: true,
    keyFields: ["id"],
    fields: {
      id: {
        external: true,
      },
    },
  },
  Expense: {
    keyFields: ["id"],
  },
});
