// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jwtVerify } from '../../utils/encrypt.util.js';
export default class ReqAuth {
  constructor(private payload: { token: string }) {}
  validate(): string | object | null {
    const { token } = this.payload;
    const decode = jwtVerify(token);
    return decode;
  }
}
