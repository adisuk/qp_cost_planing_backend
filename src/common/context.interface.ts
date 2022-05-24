import {ExpressContext} from "apollo-server-express/dist/ApolloServer";
import {PrismaClient} from '@prisma/client';
import {SignedUser} from "./authen.interface";

export interface ApolloContext {
    request: ExpressContext;
    prisma: PrismaClient;
    currentUser: SignedUser | null;
}
