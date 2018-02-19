const db = require('./libs/db');

db.connectToDb('newsbucket', (error, dbObject) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(dbObject);
});