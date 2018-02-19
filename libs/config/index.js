const path = require('path');
const nconf = require('nconf');

nconf.env().argv().file({ file: path.join(__dirname, '../../config.json') });
module.exports = nconf;
