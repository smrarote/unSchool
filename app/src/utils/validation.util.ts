import * as z from 'zod';
type ValidationResult = {
  success: true | false;
  data?: object;
  error?: z.ZodError<unknown>;
};

export default class Validator {
  validatorObject: unknown = null;
  constructor(
    private Schema: z.Schema,
    private data: object,
  ) {}
  validate(): ValidationResult {
    const result = this.Schema.safeParse(this.data);
    return result.success ? result : { success: false, error: result.error };
  }
}
