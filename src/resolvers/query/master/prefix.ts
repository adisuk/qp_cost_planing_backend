import {checkAuthorization} from "../../../services/jwt.service";
import {ApolloContext} from "../../../common/context.interface";
import {Prefix} from "@prisma/client";

export const queryRole = {
    prefix: async (parent: Prefix | null, args: any, context: ApolloContext) => {
        await checkAuthorization(context);

        return context.prisma.prefix.findUnique({
            where: {
                id: args.id,
            },
        });
    },
    prefixes: async (parent: Prefix | null, args: any, context: ApolloContext) => {
        await checkAuthorization(context);

        return context.prisma.prefix.findMany({
            where: {
                isDeleted: false,
            },
        });
    },
};
