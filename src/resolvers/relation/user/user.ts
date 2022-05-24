import {ApolloContext} from "../../../common/context.interface";
import {User as UserModel} from "@prisma/client"

export const User = {
    prefix: async ({id}: UserModel, args: any, context: ApolloContext) => await context.prisma.user.findUnique({where: { id,},}).prefix(),
    role: async ({id}: UserModel, args: any, context: ApolloContext) => await context.prisma.user.findUnique({where: { id,},}).role(),
    menus: async ({id}: UserModel, args: any, context: ApolloContext) => {
        return context.prisma.menu.findMany({
            where: {
                isDeleted: false,
            },
            orderBy: {sequence: 'asc'},
        });
    },
    createdBy: async ({id}: UserModel, args: any, context: ApolloContext) => await context.prisma.user.findUnique({where: { id,},}).createdBy(),
    updatedBy: async ({id}: UserModel, args: any, context: ApolloContext) => await context.prisma.user.findUnique({where: { id,},}).updatedBy(),
};
