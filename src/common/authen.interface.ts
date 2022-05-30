import {User} from '../../prisma/generated/client';

export interface AuthenticationResponder {
  token: string;
  refreshToken: string;
  user: User;
}

export interface SignedUser {
  id: string;
  email: string;
}
