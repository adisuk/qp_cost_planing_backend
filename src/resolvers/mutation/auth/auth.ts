import {
    comparePassword,
    updateFailedCount,
    createAuthResponse,
} from '../../../services/jwt.service';
import {
    throwError,
    loginLog,
} from '../../../services/util.service';

import {User} from "@prisma/client";
import {ApolloContext} from "../../../common/context.interface";
import {AuthenticationResponder} from "../../../common/authen.interface";

export const mutationAuth = {
    async signIn(parent: User | null, {input}: unknown, context: ApolloContext): Promise<AuthenticationResponder> {
        const user = await context.prisma.user.findUnique({
            where: {
                username: input.username,
            },
        });

        if (!user) {
            const message = `ไม่พบชื่อผู้ใช้งาน: ${input.username}`;
            const errorCode = 'signIn_username_not_found';
            const additionalProperties = {
                data: {
                    logLevel: 'high',
                    method: 'signIn',
                    payload: JSON.stringify(input),
                },
            };
            throw await throwError(context, {message, errorCode, additionalProperties});
        }

        const passwordValid = await comparePassword(input.password, user.password || '');

        if (!passwordValid) {
            await updateFailedCount(context, user.id, user.accessFailedCount + 1)
            const message = `รหัสผ่านไม่ถูกต้อง: ${input.password}`;
            const errorCode = 'signIn_invalid_password';
            const additionalProperties = {
                data: {
                    logLevel: 'high',
                    method: 'signIn',
                    payload: JSON.stringify(input),
                },
            };
            throw await throwError(context, {message, errorCode, additionalProperties});
        }
        const signInResponse = await createAuthResponse(user);
        await loginLog(context, user, signInResponse.token);
        return signInResponse;
    },
    async signOut() {
        return true;
    },
};
