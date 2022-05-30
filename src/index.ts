import Fastify from "fastify";
import mercurius from "mercurius";
import { federatedSchema } from "./schema";
import { connect } from "mongoose";
import fastifySession from "@fastify/session";
import fastifyCookie from "fastify-cookie";
import MercuriusGQLUpload from "mercurius-upload";

const main = async () => {
  await connect("mongodb://root:example@localhost:27017/test", {
    authSource: "admin",
  });
  const app = Fastify();
  app.register(fastifyCookie);
  app.register(fastifySession, {
    secret: "asecretwithminimumlengthof32characters",
    cookie: {
      secure: false,
    },
  });
  app.register(MercuriusGQLUpload, {
    // options passed to processRequest from graphql-upload
  });

  app.register(mercurius, {
    schema: federatedSchema,
    // context: buildContext,
    // Expose request and reply objects in context
    graphiql: "graphiql",
    subscription: true,
  });

  app.listen(3033);
};

main().catch((error) => {
  console.error(error);
});
