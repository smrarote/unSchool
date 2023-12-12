export type Success = {
  success: boolean;
  data: object | string | null;
};

export type Failure = {
  success: boolean;
  error: object;
};

export type Result = Success | Failure;
