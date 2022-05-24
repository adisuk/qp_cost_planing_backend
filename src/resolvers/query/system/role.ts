import {checkAuthorization} from "../../../services/jwt.service";
import {ApolloContext} from "../../../common/context.interface";
import {Role} from "@prisma/client";

export const queryRole = {
    role: async (parent: Role | null, args: any, context: ApolloContext) => {
        await checkAuthorization(context);

        return context.prisma.role.findUnique({
            where: {
                id: args.id,
            },
        });
    },
    roles: async (parent: Role | null, args: any, context: ApolloContext) => {
        await checkAuthorization(context);

        return context.prisma.role.findMany({
            where: {
                isDeleted: false,
            },
        });
    },
};
