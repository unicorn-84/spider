const { MongoClient } = require('mongodb');
const config = require('../config');

module.exports.connectToDb = (name, cb) => {
  const url = `mongodb://${config.get('db:mlab:user')}:${config.get('db:mlab:password')}@${config.get('db:mlab:domain')}/${name}`;
  MongoClient.connect(url, (error, db) => {
    if (error) {
      cb(error);
      return;
    }
    cb(null, db);
  });
};
