const request = require('request');
const iconv = require('iconv-lite');
const charsetParser = require('charset-parser');
const logger = require('uni-logger');

module.exports.toDownload = (url, cb) => {
  const options = {
    method: 'GET',
    url,
    encoding: null,
    gzip: true,
  };
  request(options, (error, response, body) => {
    if (response.statusCode !== 200) {
      logger.log(`${url} ${response.statusCode}`);
    }
    if (error) {
      logger.log(error);
      cb(error);
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
