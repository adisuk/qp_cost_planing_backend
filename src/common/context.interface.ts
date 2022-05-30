import {ExpressContext} from "apollo-server-express/dist/ApolloServer";
// import {PrismaClient} from '@prisma/client';
import {PrismaClient as PrismaClient} from '../../prisma/generated/client'
import {PrismaClient as PrismaClientLog} from '../../prisma/generated/client_log'
import {SignedUser} from "./authen.interface";

export interface ApolloContext {
  request: ExpressContext;
  prisma: PrismaClient;
  prismaLog: PrismaClientLog;
  currentUser: SignedUser | null;
}
