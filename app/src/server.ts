import winLogger from './utils/winston.util.js';
import app from './app.js';

app.listen(3000, () => {
  winLogger.http('running');
});
