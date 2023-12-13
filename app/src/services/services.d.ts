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
