export type Success = {
  success: true;
  data: object | string;
};

export type Failure = {
  success: false;
  error: object;
};

export type Result = Success | Failure;
