export type Success = {
  state: success;
  data: object | string | null;
};

export type Failure = {
  state: failed;
  error: object;
};

export type Result = Success | Failure;
