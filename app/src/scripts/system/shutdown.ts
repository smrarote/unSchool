import DataBase from '../../config/db/index.js';
import winLogger from '../../utils/winston.util.js';
const db = DataBase.db();

// generic handler for the configurations....
type Response =
  | {
      success: true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: object | string | undefined | null;
    }
  | {
      success: false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: object | undefined | null;
    };
const shutDown = async (): Promise<Response> => {
  try {
    await db.disconnect();
    winLogger.info('Server ShutDown');
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
  return {
    success: true,
    data: 'Server ShutDown',
  };
};
export default shutDown;
