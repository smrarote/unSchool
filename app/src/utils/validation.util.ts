import * as z from 'zod';
type ValidationResult =
  | {
      state: 'success';
      data: object;
    }
  | {
      state: 'failed';
      error: object;
    };

export default class Validator {
  validatorObject: unknown = null;
  constructor(
    private Schema: z.Schema,
    private data: object,
  ) {}
  validate(): ValidationResult {
    const result = this.Schema.safeParse(this.data);
    return result.success ? { state: 'success', data: result.data } : { state: 'failed', error: JSON.parse(result.error.toString()) };
  }
}
