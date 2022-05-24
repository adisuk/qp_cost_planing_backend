const bcrypt = require('bcryptjs');
import {checkAuthorization} from '../../../services/jwt.service';
import {throwError, transactionLog, generateDeleteCode} from '../../../services/util.service';
import {ApolloContext} from "../../../common/context.interface";
import {User} from "@prisma/client";

export const mutationUser = {
    createUser: async function (parent: User | null, args: any, context: ApolloContext) {
        await checkAuthorization(context);

        try {
            const userPayload = args.payload;
            const password = Math.floor(1000 + Math.random() * 9000);
            const bcryptPassword = await bcrypt.hash(password.toString(), 10);

            userPayload.role = { connect: { id: userPayload.role.id } };
            userPayload.prefix = { connect: { id: userPayload.prefix.id } };

            const createdUser = await context.prisma.user.create({
                data: {
                    ...userPayload,
                    password: bcryptPassword,
                    oneTimePassword: password.toString(),
                    oneTimePasswordReset: false,
                    createdBy: { connect: {id: context.currentUser!.id} },
                    updatedBy: { connect: {id: context.currentUser!.id} },
                },
            });
            await transactionLog(context, {
                action: 'createdUser',
                method: 'createUser',
                data: JSON.stringify(args),
            });
            return createdUser;
        } catch (error: any) {
            const { message } = error;
            const errorCode = 'create_user_failed';
            const additionalProperties = {
                data: {
                    logLevel: 'height',
                    method: 'createUser',
                    payload: JSON.stringify(args),
                },
            };
            await throwError(context, { message, errorCode, additionalProperties });
        }
    },
    updateUser: async function (parent: User | null, args: any, context: ApolloContext) {
        await checkAuthorization(context);

        try {
            const userPayload = args.payload;
            userPayload.role = { connect: { id: userPayload.role.id } };
            userPayload.prefix = { connect: { id: userPayload.prefix.id } };
            const updatedUser = await context.prisma.user.update({
                data: {
                    ...userPayload,
                    updatedBy: { connect: {id: context.currentUser!.id} },
                },
                where: {
                    id: args.id,
                },
            });
            await transactionLog(context, {
                action: 'updatedUser',
                method: 'updateUser',
                type: 'Updated',
                data: JSON.stringify(args),
            });
            return updatedUser;
        } catch (error: any) {
            console.log(error);
            const { message } = error;
            const errorCode = 'update_user_failed';
            const additionalProperties = {
                data: {
                    logLevel: 'height',
                    method: 'updateUser',
                    payload: JSON.stringify(args),
                },
            };
            await throwError(context, { message, errorCode, additionalProperties });
        }
    },
    deleteUser: async function (parent: User | null, args: any, context: ApolloContext) {
        await checkAuthorization(context);

        try {
            const user = await context.prisma.user.findUnique({
                where: { id: args.id },
            });
            const deletedUser = await context.prisma.user.update({
                where: { id: args.id },
                data: {
                    username: generateDeleteCode(user!.username),
                    email: generateDeleteCode(user!.email),
                    isDeleted: true,
                    updatedBy: { connect: {id: context.currentUser!.id} },
                },
            });
            await transactionLog(context, {
                action: 'deletedUser',
                method: 'deleteUser',
                type: 'Deleted',
                data: JSON.stringify(args),
            });
            return deletedUser;
        } catch (error: any) {
            const { message } = error;
            const errorCode = 'delete_user_failed';
            const additionalProperties = {
                data: {
                    logLevel: 'height',
                    method: 'deleteUser',
                    payload: JSON.stringify(args),
                },
            };
            await throwError(context, { message, errorCode, additionalProperties });
        }
    },
};
