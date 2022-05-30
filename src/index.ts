/**
 * Required External Modules
 */
import {ApolloServer} from 'apollo-server';
// import {PrismaClient} from '@prisma/client';
import {PrismaClient as PrismaClient} from '../prisma/generated/client'
import {PrismaClient as PrismaClientLog} from '../prisma/generated/client_log'
import {typeDefs} from './schemas';
import {getResolvers} from './resolvers';
import {ApolloContext} from "./common/context.interface";
import {getCurrentUser} from "./services/jwt.service";
import {appHostName, appPort/*, appDatabaseUrl, appDatabaseLogUrl*/} from "./common/config";

const prisma = new PrismaClient()
const prismaLog = new PrismaClientLog()

/*const prisma = new PrismaClient({
    datasources: {
        db: {
            url: appDatabaseUrl,
        },
    },
})
const prismaLog = new PrismaClient({
    datasources: {
        db: {
            url: appDatabaseLogUrl,
        },
    },
})*/

/**
 * Start the Apollo Server
 *
 * @return {Promise<void>}
 */
async function startApolloServer() {
  const resolvers = await getResolvers();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (request) => {
      // Get the user token from the headers.
      const token = request.req.headers.authorization || '';

      // Try to retrieve a user with the token
      const currentUser = await getCurrentUser(token);

      const apolloContext: ApolloContext = {
        request,
        prisma,
        prismaLog,
        currentUser,
      };

      // Add the user to the context
      return apolloContext;
    },
  });

  const {url} = await server.listen({host: appHostName, port: appPort});

  console.log(`🚀 Server ready at ${url}`);
}

startApolloServer().then();
