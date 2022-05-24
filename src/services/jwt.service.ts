import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
const  { ApolloError } = require('apollo-server-express');
import { User } from "@prisma/client";
import {
    // appPassphrase,
    appRefreshSecretKey,
    appRefreshTokenExpire,
    appSecretKey,
    appTokenExpire
} from '../common/config';
import {ApolloContext} from "../common/context.interface";
import {AuthenticationResponder, SignedUser} from "../common/authen.interface";

/**
 * Encoding the password
 * @param password
 */
export const encodePassword = async (password: string): Promise<string> => await bcrypt.hash(password, 10);

/**
 * Compare between two password
 * @param password1
 * @param password2
 */
export const comparePassword = async (password1: string, password2: string): Promise<boolean> => await bcrypt.compare(password1, password2);

/**
 * Create access token form user object
 * @param user - The object of user
 * @return {Promise<string>}
 */
export const createToken = async (user: User): Promise<string> => {
    const signedUser: SignedUser = {
        id: user.id,
        email: user.email,
        // role: user.role,
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return jwt.sign(signedUser, appSecretKey, {expiresIn: appTokenExpire});
}

/**
 * Create refresh token form user object
 * @param user - The object of user
 * @return {Promise<string>}
 */
export const createRefreshToken = async (user: User): Promise<string> => {
    const signedUser: SignedUser = {
        id: user.id,
        email: user.email,
        // role: user.role,
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return jwt.sign(signedUser, appRefreshSecretKey, {expiresIn: appRefreshTokenExpire});
}

/**
 * Update count of login failed
 * use this function when user login success or
 * login failed in case username is correct but password is not correct.
 * @param {object} context - The object of context that contain prisma client
 * @param {string} userId - The if of the User.
 * @param {number} accessFailedCount - The count of login failed.
 * @return {Promise<void>}
 */
export const updateFailedCount = async (context: ApolloContext, userId: string, accessFailedCount: number): Promise<void> => {
    await context.prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            accessFailedCount: accessFailedCount,
        },
    });
}

/**
 * Create authentication response
 * @param user
 * @return {Promise<AuthenticationResponder>}
 */
export const createAuthResponse = async (user: User): Promise<AuthenticationResponder> => {
    // before return user it good idea for remove password from the user object.
    // user.password = null;
    return {
        token: await createToken(user),
        refreshToken: await createRefreshToken(user),
        user,
    };
};

/**
 * Get refreshed token and verify it
 * @param refreshToken
 * @return Promise<SignedUser | null>
 */
export const getRefreshUser = async (refreshToken: string): Promise<SignedUser | null> => {
    if (refreshToken) {
        try {
            return <SignedUser>jwt.verify(refreshToken.replace('Bearer ', ''), appRefreshSecretKey);
        } catch (err) {
            return null;
        }
    } else {
        return null;
    }
};

/**
 * Get current user from token
 * @param token
 * @return Promise<SignedUser | null>
 */
export const getCurrentUser = async (token: string): Promise<SignedUser | null> => {
    if (token) {
        try {
            return <SignedUser>jwt.verify(token.replace('Bearer ', ''), appSecretKey);
        } catch (err) {
            return null;
        }
    } else {
        return null;
    }
};

/**
 * Check user is authorized
 * @param context
 * @return Promise<void>
 */
export const checkAuthorization = async (context: ApolloContext): Promise<void> => {
    if (!context.currentUser) {
        const message = 'Your session has ended. Please sign in again.';
        const errorCode = 'authentication_error';
        const additionalProperties = { data: { logLevel: 'low', method: 'checkAuthorization', payload: '' } };
        throw new ApolloError(message, errorCode, additionalProperties);
    }
};
