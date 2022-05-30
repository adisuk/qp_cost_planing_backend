import {ApolloContext} from "../../../common/context.interface";
import {
  Role as RoleModel,
  Permission as PermissionModel,
} from "../../../../prisma/generated/client"

export const Role = {
  permissions: async ({id}: RoleModel, args: any, context: ApolloContext) => await context.prisma.role.findUnique({where: {id,},}).permissions(),
  createdBy: async ({id}: RoleModel, args: any, context: ApolloContext) => await context.prisma.role.findUnique({where: {id,},}).createdBy(),
  updatedBy: async ({id}: RoleModel, args: any, context: ApolloContext) => await context.prisma.role.findUnique({where: {id,},}).updatedBy(),
};
export const Permission = {
  role: async ({id}: PermissionModel, args: any, context: ApolloContext) => await context.prisma.permission.findUnique({where: {id,},}).role(),
  unitMenu: async ({id}: PermissionModel, args: any, context: ApolloContext) => await context.prisma.permission.findUnique({where: {id,},}).unitMenu(),
  createdBy: async ({id}: PermissionModel, args: any, context: ApolloContext) => await context.prisma.permission.findUnique({where: {id,},}).createdBy(),
  updatedBy: async ({id}: PermissionModel, args: any, context: ApolloContext) => await context.prisma.permission.findUnique({where: {id,},}).updatedBy(),
};
