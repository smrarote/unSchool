// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface genError extends Error {
  status: number;
  success: false;
  body: object;
}

// default general response error
export default class GenError extends Error implements genError {
  status = 500;
  body = {};
  success: false;
  constructor(message: string, status: number, error: object | undefined | null, stack: string | undefined | null) {
    super(message);
    this.status = status;
    this.success = false;
    if (error) {
      this.body = error;
    }
    if (stack) {
      super.stack = stack;
    }
  }
}
