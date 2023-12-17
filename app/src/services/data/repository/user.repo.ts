/* eslint-disable camelcase */
import DataBase from '../../../config/db/index.js';
import Validator from '../../../utils/validation.util.js';
import { userSchema } from '../validators.js';
import { ValError } from '../errors.js';
import { User, findUser, UserDTO } from '../../services';
type Result = {
  state: string;
  data?: UserDTO | null;
  error?: Error;
};
export default class UserRepo {
  private static db = DataBase.db();
  constructor(public userId: string) {
    if (!userId) throw Error('require userId');
  }
  async getUser(deleted: boolean = false): Promise<Result> {
    return await UserRepo.db.client.users
      .findFirst({
        where: {
          user_id: this.userId,
          ...(!deleted && { deletedAt: null }),
        },
      })
      .then((data) => ({ state: 'success', data }))
      .catch((error) => ({ state: 'failed', error }));
  }
  static async createUser(user: User): Promise<Result> {
    const valRes = new Validator(userSchema, user).validate();
    if (valRes.state === 'failed') {
      return { state: 'failed', error: new ValError('Failed Create : User Body Validation', valRes.error) };
    }
    user = valRes.data as User;
    return await UserRepo.db.client.users
      .create({
        data: user,
      })
      .then((data) => ({ state: 'success', data }))
      .catch((error) => ({ state: 'failed', error }));
  }
  async isValid(): Promise<Result> {
    return UserRepo.db.client.users
      .findFirst({
        where: {
          user_id: this.userId,
          verified: true,
        },
      })
      .then((data) => ({ state: 'success', data }))
      .catch((error) => ({ state: 'failed', error }));
  }
  async findUser(): Promise<Result> {
    return UserRepo.db.client.users
      .findFirst({
        where: {
          user_id: this.userId,
        },
      })
      .then((data) => ({ state: 'success', data }))
      .catch((error) => ({ state: 'failed', error }));
  }
  static async isUserExists(user: findUser): Promise<Result> {
    const { username, email } = user;
    if (!(username || email)) {
      return { state: 'failed', error: new ValError('Invlid Arguments : username, email, user_id', null) };
    }
    return await UserRepo.db.client.users
      .findFirst({
        where: user,
      })
      .then((data) => ({ state: 'success', data }))
      .catch((error) => ({ state: 'failed', error }));
  }
}
