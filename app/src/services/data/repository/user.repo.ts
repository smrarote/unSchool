/* eslint-disable camelcase */
import DataBase from '../../../config/db';
import Validator from '../../../utils/validation.util.js';
import { Result } from '../../../global';
import { userSchema } from '../validators.js';
import { ValError } from '../errors.js';
import { User } from '../../services';
export default class UserRepo {
  private db = DataBase.db();
  constructor(public userId: string) {
    if (!userId) throw Error('rquire userId');
  }
  async getUser(deleted: boolean = false): Promise<Result> {
    return await this.db.client.users
      .findFirst({
        where: {
          user_id: this.userId,
          ...(!deleted && { deletedAt: null }),
        },
      })
      .then((data) => ({ success: true, data }))
      .catch((error) => ({ success: false, error }));
  }
  async createUser(user: User): Promise<Result> {
    const valRes = new Validator(userSchema, user).validate();
    if (!valRes.success) {
      return { success: false, error: new ValError('Failed Create : User Body Validation', valRes.error) };
    }
    user = valRes.data as User;
    return await this.db.client.users
      .create({
        data: user,
      })
      .then((data) => ({ success: true, data }))
      .catch((error) => ({ success: false, error }));
  }
}
