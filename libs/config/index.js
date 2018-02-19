const path = require('path');
const nconf = require('nconf');

nconf.env().argv().file(path.join(__dirname, '../../config.json')).file('db', path.join(__dirname, '../../db.json'));
module.exports = nconf;
