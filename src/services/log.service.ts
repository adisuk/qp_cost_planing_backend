import {throwError} from "./util.service";

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
    if (context.currentUser) {
      data.accountId = context.currentUser.id;
    }
    await context.prismaLog.transactionLog.create({data: data});
  } catch (error: any) {
    const {message} = error;
    const errorCode = 'transactionLog_create_failed';
    const additionalProperties = {
      data: {logLevel: 'high', method: 'transactionLog', payload: ''},
    };
    await throwError(context, {message, errorCode, additionalProperties});
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
    if (token != "") {
      data.status = "Passed"
    }
    if (accountId != "") {
      data.accountId = accountId;
    }
    await context.prismaLog.loginLog.create({data: data});
  } catch (error: any) {
    // console.log(error);
    const {message} = error;
    const errorCode = 'loginLog_create_failed';
    const additionalProperties = {
      data: {logLevel: 'high', method: 'loginLog', payload: ''},
    };
    await throwError(context, {message, errorCode, additionalProperties});
  }
};
