const moment = require('moment');
const { ApolloError } = require('apollo-server-express');
/**
 * Convert text to capitalize the first letter
 * @param {string} text - text that you want to convert to capitalize
 * @return {string} - new text with capitalize
 */
export const capitalizeFirstLetter = (text: string): string => {
    return `${text.charAt(0).toUpperCase() + text.slice(1)}`;
}
/**
 * Throw Error When Always Application Crash
 * @param {any} context -
 * @param {any} error -
 * @return {void} -
 */
export const throwError = async (context: any, error: any) => {
    let account = {};
    if (context.currentUser) {
        account = { connect: { id: context.currentUser.id } };
    }
    await context.prisma.eventLog.create({
        data: {
            ipAddress: context.request.req.headers['x-forwarded-for'] || context.request.req.connection.remoteAddress,
            logLevel: error.additionalProperties.data.logLevel,
            method: error.additionalProperties.data.method,
            message: error.message,
            errorCode: error.errorCode,
            account,
            payload: error.additionalProperties.data.payload,
        },
    });
    throw new ApolloError(error.message, error.errorCode, error.additionalProperties);
};
/**
 * Add Transaction Log When always Application Success CRUD On Database
 * @param {any} context -
 * @param {any} payload -
 * @return {void} -
 */
export const transactionLog = async (context: any, payload: any) => {
    try {
        await context.prisma.transactionLog.create({
            data: {
                action: payload.action,
                method: payload.method,
                type: payload.type,
                account: { connect: { id: context.currentUser.id } },
                payload: payload.data,
            },
        });
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
export const loginLog = async (context: any, user: any, token: any) => {
    try {
        await context.prisma.loginLog.create({
            data: {
                token: token,
                type: 'SignIn',
                account: { connect: { id: user.id } },
                status: 'Passed',
            },
        });
    } catch (error: any) {
        const { message } = error;
        const errorCode = 'loginLog_create_failed';
        const additionalProperties = {
            data: { logLevel: 'high', method: 'loginLog', payload: '' },
        };
        await throwError(context, { message, errorCode, additionalProperties });
    }
};/**
 * Convert unique code to new code
 * @param {any} code - old code
 * @return {String} - code before convert
 */
export const generateDeleteCode = (code: String) => {
    return `${code}_deleted_${moment().format('YYYYMMDDHHmmss')}`;
};
