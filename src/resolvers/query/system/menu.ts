import {checkAuthorization} from "../../../services/jwt.service";
import {ApolloContext} from "../../../common/context.interface";
import {Menu, SubMenu, UnitMenu} from "@prisma/client";

export const queryRole = {
    menu: async (parent: Menu | null, args: any, context: ApolloContext) => {
        await checkAuthorization(context);

        return context.prisma.menu.findUnique({
            where: {
                id: args.id,
            },
        });
    },
    menus: async (parent: Menu | null, args: any, context: ApolloContext) => {
        await checkAuthorization(context);

        return context.prisma.menu.findMany({
            where: {
                isDeleted: false,
            },
        });
    },
    subMenu: async (parent: SubMenu | null, args: any, context: ApolloContext) => {
        await checkAuthorization(context);

        return context.prisma.subMenu.findUnique({
            where: {
                id: args.id,
            },
        });
    },
    subMenus: async (parent: SubMenu | null, args: any, context: ApolloContext) => {
        await checkAuthorization(context);

        return context.prisma.subMenu.findMany({
            where: {
                isDeleted: false,
            },
        });
    },
    unitMenu: async (parent: UnitMenu | null, args: any, context: ApolloContext) => {
        await checkAuthorization(context);

        return context.prisma.unitMenu.findUnique({
            where: {
                id: args.id,
            },
        });
    },
    unitMenus: async (parent: UnitMenu | null, args: any, context: ApolloContext) => {
        await checkAuthorization(context);

        return context.prisma.unitMenu.findMany({
            where: {
                isDeleted: false,
            },
        });
    },
};
