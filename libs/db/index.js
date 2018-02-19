const { MongoClient } = require('mongodb');
const config = require('../config');

module.exports.connectToDb = (name, cb) => {
  const url = `mongodb://${config.get('db:mlab:user')}:${config.get('db:mlab:password')}@ds141068.mlab.com:41068/${name}`;
  MongoClient.connect(url, (error, db) => {
    if (error) {
      cb(error);
      return;
    }
    const dbObject = db.db(name);
    cb(null, dbObject);
    db.close();
  });
};
