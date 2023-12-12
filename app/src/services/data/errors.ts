import { errorNames } from '../../config/constants/statusErrors.js';
export const ValError = class ValErr extends Error {
  name = errorNames.validation;
  body: object | null = null;
  constructor(message = 'validation failed', body: object | null) {
    super(message);
    this.body = body;
  }
};
