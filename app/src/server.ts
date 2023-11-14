import winLogger from './utils/winston.util.js';
import app from './app.js';
import bootConfig from './utils/boot.util.js';
// boot process
void (async (): Promise<void> => {
  const response = await bootConfig();
  if (response.success) {
    winLogger.info('Server : Boot : Success');
  } else {
    winLogger.info(`Server : Boot : failed : ${response.error}`);
  }
})();

// handle
app.listen(process.env.PORT ?? 3000, () => {
  winLogger.info(` Server : Running : ${process.env.PORT || 3000}`);
});
