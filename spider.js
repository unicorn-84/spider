const db = require('./libs/db');
const logger = require('./libs/logger');
const requester = require('./libs/requester');
const massMedia = require('./massMedia');
const config = require('./libs/config');

const dbName = config.get('db:mlab:name');
const collection = config.get('db:mlab:collection');
const count = massMedia.length;
let completed = 0;

logger.log('Spider started');

function toUpdateData(database, item, body, cb) {
  database.collection(collection).update({ name: item.name }, { $set: { body } }, (error) => {
    if (error) {
      cb(error);
      return;
    }
    cb(null);
  });
}

function toRecordData(database, item, body, cb) {
  database.collection(collection).insert({ name: item.name, body }, (error) => {
    if (error) {
      cb(error);
      return;
    }
    cb(null);
  });
}

function toCheckData(database, item, body, cb) {
  database.collection(collection).findOne({ name: item.name }, (error, result) => {
    if (error) {
      cb(error);
      return;
    }
    if (!result) {
      toRecordData(database, item, body, cb);
      return;
    }
    toUpdateData(database, item, body, cb);
  });
}

function toDownload(database, cb) {
  massMedia.forEach((item) => {
    requester.toDownload(item.url, (error, body) => {
      if (error) {
        cb(error);
        return;
      }
      toCheckData(database, item, body, cb);
    });
  });
}

db.connectToDb(dbName, (error, dbObject) => {
  if (error) {
    logger.log(error);
    return;
  }
  logger.log('Connect to mLab');
  const database = dbObject.db(dbName);
  toDownload(database, (err) => {
    if (err) {
      logger.log(err);
      return;
    }
    completed += 1;
    if (completed === count) {
      dbObject.close();
      logger.log('Spider finished');
    }
  });
});
