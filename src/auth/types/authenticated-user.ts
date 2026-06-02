export type AuthenticatedUser = {
  id: string;
  username: string;
};

export type JwtPayload = {
  sub: string;
  username: string;
};
