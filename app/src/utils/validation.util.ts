import * as z from 'zod';
type ValidationResult =
  | {
      success: true;
      data: object;
    }
  | {
      success: false;
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
    return result.success ? { success: true, data: result.data } : { success: false, error: JSON.parse(result.error.toString()) };
  }
}
