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
    if (context.currentUser) {
      data.accountId = context.currentUser.id;
    }
    await context.prisma.eventLog.create({data: data});
    await context.prismaLog.eventLog.create({data: dataLog});
    throw new ApolloError(error.message, error.errorCode, error.additionalProperties);
  } catch (error: any) {
    console.log(error);
    const {message, errorCode} = error;
    const additionalProperties = {
      data: {logLevel: 'high', method: 'throwError', payload: ''},
    };
    throw new ApolloError(message, errorCode, additionalProperties);
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
