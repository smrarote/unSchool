import prisma from './client.js';
import winLogger from '../../utils/winston.util.js';
export default class DataBase {
  private static instance: DataBase | null = null;
  public client = prisma;
  private constructor() {}
  public static db(): DataBase {
    if (DataBase.instance) {
      return DataBase.instance;
    }
    return new DataBase();
  }
  public async connect(): Promise<boolean> {
    await this.client.$connect();
    winLogger.info('DB : Connected');
    return true;
  }
  public async disconnect(): Promise<boolean> {
    await this.client.$disconnect();
    winLogger.info('DB : Disconnected');
    return true;
  }
}
