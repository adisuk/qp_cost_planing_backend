import {checkAuthorization} from "../../../services/jwt.service";
import {getPagination} from "../../../services/pagination.service";
import {ApolloContext} from "../../../common/context.interface";
import {User} from "@prisma/client";
import {errorHandler} from "../../../common/error.handler";

export const queryUser = {
    currentUser: async (parent: User | null, args: any, context: ApolloContext) => {
        await checkAuthorization(context);

        const id = context.currentUser?.id;

        return context.prisma.user.findUnique({
            where: {
                id,
            },
        });
    },
    user: async (parent: User | null, args: any, context: ApolloContext) => {
        await checkAuthorization(context);

        return context.prisma.user.findUnique({
            where: {
                id: args.id,
            },
        });
    },
    users: async (parent: User | null, args: any, context: ApolloContext) => {
        await checkAuthorization(context);

        return context.prisma.user.findMany({
            where: {
                isDeleted: false,
            },
        });
    },
    usersPagination: async (parent: User | null, args: any, context: ApolloContext) => {
        await checkAuthorization(context);

        try {
            const where = {
                isDeleted: false,
            };

            return await getPagination(context.prisma.user, where, args);
        } catch (e) {
            throw errorHandler(e)
        }
    },
};
