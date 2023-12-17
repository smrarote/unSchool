import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { genHash } from '../../utils/encrypt.util.js';
prisma.$use(async (params, next) => {
  // Manipulate params here
  if (params.action == 'create' && params.model == 'users') {
    const user = params.args.data;
    user.password = await genHash(user.password);
    params.args.data = user;
  }
  return next(params);
});

export default prisma;
