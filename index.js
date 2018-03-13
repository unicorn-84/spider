const db = require('./libs/db');
const logger = require('uni-logger');
const requester = require('./libs/requester');
const massMedia = require('./massMedia');
const config = require('./libs/config');
const parser = require('./libs/parser');

const dbName = config.get('db:mlab:name');
const collection = config.get('db:mlab:collection');
const count = massMedia.length;
let completed = 0;

logger.log('Spider started\n');

function toUpdateData(database, item, news, cb) {
  database.collection(collection).update({ name: item.name }, { $set: { news } }, (error) => {
    if (error) {
      cb(error);
      return;
    }
    cb(null);
  });
}

function toRecordData(database, item, news, cb) {
  database.collection(collection).insert({ name: item.name, news }, (error) => {
    if (error) {
      cb(error);
      return;
    }
    cb(null);
  });
}

function toCheckData(database, item, news, cb) {
  database.collection(collection).findOne({ name: item.name }, (error, result) => {
    if (error) {
      cb(error);
      return;
    }
    if (!result) {
      toRecordData(database, item, news, cb);
      return;
    }
    toUpdateData(database, item, news, cb);
  });
}

function toParse(database, body, item, cb) {
  parser.toParseBody(body, item, (error, news) => {
    if (error) {
      cb(error);
      return;
    }
    toCheckData(database, item, news, cb);
  });
}

function toDownload(database, cb) {
  massMedia.forEach((item) => {
    requester.toDownload(item.url, (error, body) => {
      if (error) {
        cb(error);
        return;
      }
      toParse(database, body, item, cb);
    });
  });
}

db.connectToDb(dbName, (error, dbObject) => {
  if (error) {
    logger.log(error);
    return;
  }
  logger.log('Connect to mLab\n');
  const database = dbObject.db(dbName);
  toDownload(database, (err) => {
    if (err) {
      logger.log(err);
    }
    completed += 1;
    if (completed === count) {
      dbObject.close();
      logger.log('Spider finished\n');
    }
  });
});
