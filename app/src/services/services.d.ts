export type User = {
  username: string;
  first_name: string;
  last_name?: string | undefined;
  email: string;
  mobile?: string;
  password: string;
  verified?: boolean;
  social?: object;
};
export type findUser = {
  username?: string;
  user_id?: string;
  email?: string;
};

export type UserDTO = {
  id: bigint;
  user_id: string;
  username: string;
  first_name: string;
  last_name: string | null;
  email: string;
  mobile: string | null;
  password: string;
  verified: boolean;
  social: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
};
