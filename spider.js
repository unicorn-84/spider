const db = require('./libs/db');
const logger = require('./libs/logger');
const req = require('./libs/requester');
const massMedia = require('./massMedia');

logger.log('Spider started');

function toDownload(cb) {
  massMedia.forEach((item) => {
    req.toDownload(item.url, (error, body) => {
      if (error) {
        cb(error);
        return;
      }
      cb(null);
    });
  });
}

db.connectToDb('newsbucket', (error, dbObject) => {
  if (error) {
    logger.log(error);
    return;
  }
  logger.log('Connect to mLab');
  toDownload((err) => {
    if (err) {
      logger.log(err);
    }
  });
});
