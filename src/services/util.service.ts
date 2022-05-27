import moment from "moment";

import {ApolloError} from "apollo-server-express";

/**
 * Throw Error When Always Application Crash
 * @param {any} context -
 * @param {any} error -
 * @return {void} -
 */
export const throwError = async (context: any, error: any) => {
    try {
        const data: any = {
            ipAddress: context.request.req.headers['x-forwarded-for'] || context.request.req.connection.remoteAddress,
            logLevel: error.additionalProperties.data.logLevel,
            method: error.additionalProperties.data.method,
            message: error.message,
            errorCode: error.errorCode,
            payload: error.additionalProperties.data.payload,
        };
        const dataLog: any = {
            ipAddress: context.request.req.headers['x-forwarded-for'] || context.request.req.connection.remoteAddress,
            logLevel: error.additionalProperties.data.logLevel,
            method: error.additionalProperties.data.method,
            message: error.message,
            errorCode: error.errorCode,
            payload: error.additionalProperties.data.payload,
        };
        if (context.currentUser) { data.accountId = context.currentUser.id;}
        await context.prisma.eventLog.create({data: data});
        await context.prismaLog.eventLog.create({data: dataLog});
        throw new ApolloError(error.message, error.errorCode, error.additionalProperties);
    } catch (error: any) {
        console.log(error);
        const { message, errorCode } = error;
        const additionalProperties = {
            data: { logLevel: 'high', method: 'throwError', payload: '' },
        };
        throw new ApolloError(message, errorCode, additionalProperties);
    }
};
/**
 * Add Transaction Log When always Application Success CRUD On Database
 * @param {any} context -
 * @param {any} payload -
 * @return {void} -
 */
export const transactionLog = async (context: any, payload: any) => {
    try {
        const data: any = {
            action: payload.action,
            method: payload.method,
            type: payload.type,
            payload: payload.data,
        }
        const dataLog: any = {
            action: payload.action,
            method: payload.method,
            type: payload.type,
            payload: payload.data,
        }
        if (context.currentUser) { data.accountId = context.currentUser.id;}
        await context.prisma.transactionLog.create({data: data});
        await context.prismaLog.transactionLog.create({data: dataLog});
    } catch (error: any) {
        const { message } = error;
        const errorCode = 'transactionLog_create_failed';
        const additionalProperties = {
            data: { logLevel: 'high', method: 'transactionLog', payload: '' },
        };
        await throwError(context, { message, errorCode, additionalProperties });
    }
};
/**
 * Add Login Log When always Application Success On SignIn
 * @param {any} context -
 * @param {any} user -
 * @param {any} token -
 * @return {void} -
 */
export const loginLog = async (context: any, accountId: string, token: string, message: string) => {
    try {
        const data: any = {
            token: token,
            type: 'SignIn',
            status: 'Failed',
            message: message,
        };
        const dataLog: any = {
            token: token,
            type: 'SignIn',
            status: 'Failed',
            message: message,
        };
        if ( token != "" ) { data.status = "Passed"}
        if ( accountId != "" ) { data.accountId = accountId;}
        await context.prisma.loginLog.create({data: data});
        await context.prismaLog.loginLog.create({data: dataLog});
    } catch (error: any) {
        // console.log(error);
        const { message } = error;
        const errorCode = 'loginLog_create_failed';
        const additionalProperties = {
            data: { logLevel: 'high', method: 'loginLog', payload: '' },
        };
        await throwError(context, { message, errorCode, additionalProperties });
    }
};
/**
 * Convert unique code to new code
 * @param {any} code - old code
 * @return {String} - code before convert
 */
export const generateDeleteCode = (code: string) => {
    return `${code}_deleted_${moment().format('YYYYMMDDHHmmss')}`;
};
