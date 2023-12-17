/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../../../services/services';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { catchAsync, GenError, winLogger, errorNames, statusCodes, response, requestHandler, UserRepo } from '../../common.imports.js';
import { compHash, jwtSign } from '../../../utils/encrypt.util.js';

export const signIn = requestHandler(async (_req: Request, _res: Response, _next: NextFunction): Promise<void> => {
  const { username, password } = _req.body;
  const [withUsername, withUserEmail] = await Promise.all([
    UserRepo.isUserExists({ username: username }),
    UserRepo.isUserExists({ email: username }),
  ]);
  if (withUserEmail.state === 'failed' || withUsername.state === 'failed') {
    winLogger.error(withUsername.error || withUserEmail.error);
    return _next(new GenError('Server Error', statusCodes.SERVER_ERR, null, null, errorNames.db));
  }

  let user = withUsername.data || withUserEmail.data;
  if (!user) {
    return _next(new GenError('User not found', statusCodes.FORBIDDEN, null, null, errorNames.validation));
  }
  // check the password ...
  user = user as UserDTO;
  if (!(await compHash(password, user.password))) {
    return _next(new GenError('Invalid Credentials', statusCodes.FORBIDDEN, null, null, errorNames.validation));
  }
  // assign the JWT token
  const token = jwtSign({
    user_id: user.user_id,
    createAt: new Date(),
    ip: _req.ip,
  });
  response(_res, {
    code: statusCodes.SUCCESS,
    success: true,
    message: 'User SignedIn',
    data: {
      token,
      // eslint-disable-next-line camelcase
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      createAt: new Date(),
    },
  });
});

export const signUp = requestHandler(async (_req: Request, _res: Response, _next: NextFunction): Promise<void> => {
  // sign upd check wether user already exits, check weather deleted, allow to sign in and push the validation process in the background.
  const userBody = _req.body;
  const [isUserWithUsername, isUserWithEmail] = await Promise.all([
    UserRepo.isUserExists({ username: userBody.username }),
    UserRepo.isUserExists({ email: userBody.email }),
  ]);
  if (isUserWithUsername.state === 'failed' || isUserWithEmail.state === 'failed') {
    winLogger.error(isUserWithUsername.error || isUserWithEmail.error);
    return _next(new GenError('Server Error', statusCodes.SERVER_ERR, null, null, errorNames.db));
  }
  if (isUserWithUsername.data != null) {
    // user already exits with the user_id or the
    return _next(new GenError(`User exists with ${userBody.username}`, statusCodes.CONFLICT, null, null, errorNames.validation));
  }
  if (isUserWithEmail.data != null) {
    return _next(new GenError(`User exists with ${userBody.email}`, statusCodes.CONFLICT, null, null, errorNames.validation));
  }
  // user elibible to create account
  const createUser = await UserRepo.createUser(userBody);
  if (createUser.state == 'success') {
    response(_res, {
      code: statusCodes.SUCCESS,
      success: true,
      message: 'User Created',
      data: { username: userBody.username, email: userBody.email, createdAt: new Date() },
    });
  } else {
    winLogger.info(createUser.error);
    return _next(new GenError('Server Error', statusCodes.SERVER_ERR, null, null, errorNames.db));
  }
});
