const db = require('./libs/db');
const logger = require('./libs/logger');

logger.log('Spider started');

db.connectToDb('newsbucket', (error, dbObject) => {
  if (error) {
    logger.log(error);
    return;
  }
  logger.log('Connect to mLab');
});
