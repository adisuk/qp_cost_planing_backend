import {checkAuthorization} from '../../../services/jwt.service';
import {throwError} from '../../../services/util.service';
import {transactionLog} from '../../../services/log.service';
import {ApolloContext} from "../../../common/context.interface";
import {Prefix} from "../../../../prisma/generated/client";

export const mutationPrefix = {
  createPrefix: async function (parent: Prefix | null, args: any, context: ApolloContext) {
    await checkAuthorization(context);

    try {
      const prefixPayload = args.payload;

      const createdPrefix = await context.prisma.prefix.create({
        data: {
          ...prefixPayload,
          createdBy: {connect: {id: context.currentUser!.id}},
          updatedBy: {connect: {id: context.currentUser!.id}},
        },
      });
      await transactionLog(context, {
        action: 'createdPrefix',
        method: 'createPrefix',
        data: JSON.stringify(args),
      });
      return createdPrefix;
    } catch (error: any) {
      const {message} = error;
      const errorCode = 'create_prefix_failed';
      const additionalProperties = {
        data: {
          logLevel: 'height',
          method: 'createPrefix',
          payload: JSON.stringify(args),
        },
      };
      await throwError(context, {message, errorCode, additionalProperties});
    }
  },
  updatePrefix: async function (parent: Prefix | null, args: any, context: ApolloContext) {
    await checkAuthorization(context);

    try {
      const prefixPayload = args.payload;
      const updatedPrefix = await context.prisma.prefix.update({
        data: {
          ...prefixPayload,
          updatedBy: {connect: {id: context.currentUser!.id}},
        },
        where: {
          id: args.id,
        },
      });
      await transactionLog(context, {
        action: 'updatedPrefix',
        method: 'updatePrefix',
        type: 'Updated',
        data: JSON.stringify(args),
      });
      return updatedPrefix;
    } catch (error: any) {
      console.log(error);
      const {message} = error;
      const errorCode = 'update_prefix_failed';
      const additionalProperties = {
        data: {
          logLevel: 'height',
          method: 'updatePrefix',
          payload: JSON.stringify(args),
        },
      };
      await throwError(context, {message, errorCode, additionalProperties});
    }
  },
  deletePrefix: async function (parent: Prefix | null, args: any, context: ApolloContext) {
    await checkAuthorization(context);

    try {
      const deletedPrefix = await context.prisma.prefix.update({
        where: {id: args.id},
        data: {
          isDeleted: true,
          updatedBy: {connect: {id: context.currentUser!.id}},
        },
      });
      await transactionLog(context, {
        action: 'deletedPrefix',
        method: 'deletePrefix',
        type: 'Deleted',
        data: JSON.stringify(args),
      });
      return deletedPrefix;
    } catch (error: any) {
      const {message} = error;
      const errorCode = 'delete_prefix_failed';
      const additionalProperties = {
        data: {
          logLevel: 'height',
          method: 'deletePrefix',
          payload: JSON.stringify(args),
        },
      };
      await throwError(context, {message, errorCode, additionalProperties});
    }
  },
};
