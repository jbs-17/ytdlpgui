import * as os from 'node:os';
import * as cluster from 'node:cluster';
import process from 'node:process';
import { app } from './app.mjs';
import { configs } from './configs.mjs';
import { logger } from './utils/logger.util.mjs';


if (cluster.default.isPrimary) {
  logger.info(`Master id:${process.pid}`);
  const cpus = os.cpus().length;
  for (let cpu = 0; cpu < cpus; cpu++) {
    cluster.default.fork();
    cluster.default.on('fork', (worker) => {
      logger.info(`forking worker ${worker.id}`);
    })
    cluster.default.on('exit', (worker, code, signal) => {
      logger.info(`worker id:${worker.id} exit; code: ${code}; signal: ${signal}`);
      cluster.default.fork();
    });
  };
} else {
  app.listen(configs.PORT, () => {
    logger.info(`Worker pid: ${process.pid} is listening on port ${configs.PORT}...`);
  });
}