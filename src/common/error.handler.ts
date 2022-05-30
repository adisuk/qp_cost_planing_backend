import {ApolloError, AuthenticationError, ForbiddenError, UserInputError} from "apollo-server";

/**
 * Standard of error code
 */
export const errorCode = {
  unknown: {
    code: 'ERR_001',
    message: 'Unknown Error'
  },
  internalServer: {
    code: 'ERR_002',
    message: 'Internal Server Error'
  }
}

/**
 * Convert exception to error message and throw error.
 * Throw Original Error Class when known error
 * Throw ApolloError when unknown error
 * @param error
 * @param data
 */
export const errorHandler = (error: unknown, data: Record<string, any> | undefined = undefined): any => {
  if (error instanceof AuthenticationError ||
    error instanceof UserInputError ||
    error instanceof ForbiddenError ||
    error instanceof ApolloError) {
    return error;
  }

  let result = errorCode.unknown;

  if (error instanceof Error) {
    result = errorCode.internalServer;
    result.message += `: ${(<Error>error).message}`
  } else if (typeof error === "string") {
    result = errorCode.internalServer;
    result.message += `: ${error}`
  }

  console.log(result, error, data)
  return new ApolloError(result.message, result.code, data);
}
