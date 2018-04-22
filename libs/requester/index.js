const iconv = require('iconv-lite');
const charsetParser = require('charset-parser');
const Logger = require('uni-logger');
const config = require('../config');
const util = require('util');
const request = require('request-promise-native');

const logger = new Logger({ path: config.get('logDir') });

module.exports.toDownload = (url, cb) => {
  const options = {
    method: 'GET',
    url,
    encoding: null,
    gzip: true,
    simple: false,
    resolveWithFullResponse: true,
  };
  // request(options, (error, response) => {
  //   if (error) {
  //     cb(`From ${url}\n${error}`);
  //     return;
  //   } else if (response.statusCode !== 200) {
  //     logger.log(`${url} ${response.statusCode}\n`);
  //     return;
  //   }
  //   const charset = charsetParser(response.headers['content-type']);
  //   if (charset === 'windows-1251') {
  //     cb(null, iconv.decode(response.body, 'win1251'));
  //     return;
  //   }
  //   cb(null, response.body.toString());
  // });
  request(options)
    .then((response) => {
      console.log(`${url} respond ${response.statusCode}`);
      if (response.statusCode !== 200) {
        throw new Error(`${url} respond ${response.statusCode}`);
      }
      const charset = charsetParser(response.headers['content-type']);
      if (charset === 'windows-1251') {
        cb(null, iconv.decode(response.body, 'win1251'));
        console.log('after charset');
        return;
      }
      cb(null, response.body.toString());
    })
    .catch(error => cb(error));
};
