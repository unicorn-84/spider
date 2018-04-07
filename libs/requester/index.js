const request = require('request');
const iconv = require('iconv-lite');
const charsetParser = require('charset-parser');
const Logger = require('uni-logger');
const config = require('../config');

const logger = new Logger({ path: config.get('logDir') });

module.exports.toDownload = (url, cb) => {
  const options = {
    method: 'GET',
    url,
    encoding: null,
    gzip: true,
  };
  request(options, (error, response, body) => {
    if (error) {
      cb(error);
      return;
    } else if (response.statusCode !== 200) {
      logger.log(`${url} ${response.statusCode}\n`);
      return;
    }
    const charset = charsetParser(response.headers['content-type']);
    if (charset === 'windows-1251') {
      cb(null, iconv.decode(body, 'win1251'));
      return;
    }
    cb(null, body.toString());
  });
};
