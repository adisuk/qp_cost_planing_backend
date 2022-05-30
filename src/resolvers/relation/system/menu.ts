import {ApolloContext} from "../../../common/context.interface";
import {Menu as MenuModel, SubMenu as SubMenuModel, UnitMenu as UnitMenuModel} from "../../../../prisma/generated/client"

export const Menu = {
  subMenus: async ({id}: MenuModel, args: any, context: ApolloContext) => await context.prisma.menu.findUnique({where: {id,},}).subMenus({orderBy: {sequence: 'asc'},}),
  createdBy: async ({id}: MenuModel, args: any, context: ApolloContext) => await context.prisma.menu.findUnique({where: {id,},}).createdBy(),
  updatedBy: async ({id}: MenuModel, args: any, context: ApolloContext) => await context.prisma.menu.findUnique({where: {id,},}).updatedBy(),
};
export const SubMenu = {
  menu: async ({id}: SubMenuModel, args: any, context: ApolloContext) => await context.prisma.subMenu.findUnique({where: {id,},}).menu(),
  unitMenus: async ({id}: SubMenuModel, args: any, context: ApolloContext) => await context.prisma.subMenu.findUnique({where: {id,},}).unitMenus({orderBy: {sequence: 'asc'},}),
  createdBy: async ({id}: SubMenuModel, args: any, context: ApolloContext) => await context.prisma.subMenu.findUnique({where: {id,},}).createdBy(),
  updatedBy: async ({id}: SubMenuModel, args: any, context: ApolloContext) => await context.prisma.subMenu.findUnique({where: {id,},}).updatedBy(),
};
export const UnitMenu = {
  subMenu: async ({id}: UnitMenuModel, args: any, context: ApolloContext) => await context.prisma.unitMenu.findUnique({where: {id,},}).subMenu(),
  permissions: async ({id}: UnitMenuModel, args: any, context: ApolloContext) => await context.prisma.unitMenu.findUnique({where: {id,},}).permissions({orderBy: {id: 'asc'},}),
  createdBy: async ({id}: UnitMenuModel, args: any, context: ApolloContext) => await context.prisma.unitMenu.findUnique({where: {id,},}).createdBy(),
  updatedBy: async ({id}: UnitMenuModel, args: any, context: ApolloContext) => await context.prisma.unitMenu.findUnique({where: {id,},}).updatedBy(),
};
