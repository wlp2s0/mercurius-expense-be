import { FastifyRequest, FastifyReply } from "fastify";
import { IExpense } from "../graphql/expense/expense";
import type * as Fastify from "fastify";

declare module "fastify" {
  interface Session {
    user?: IExpense;
  }
}

// export interface Context {
//   session: Fastify.Session;
//   user?: IExpense;
// }

// export const buildContext = async (
//   request: FastifyRequest,
//   _reply: FastifyReply
// ): Promise<Context> => {
//   let context: Context = { session: request.session };
//   try {
//     if (request.session.user) {
//       context.user = request.session.user;
//     }
//     const authorizationHeader = request.headers.authorization;
//     if (authorizationHeader?.includes("Basic")) {
//     }

//     if (authorizationHeader?.includes("Bearer")) {
//       // const token = authorizationHeader.replace("Bearer ", "")
//       // const payload = await verifyToken(token)
//       // context = { payload }
//     }
//   } catch (error) {
//     console.error(error);
//   }
//   return context;
// };
