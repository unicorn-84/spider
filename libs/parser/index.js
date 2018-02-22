const cheerio = require('cheerio');
const path = require('path');

exports.toParseBody = (data, item, cb) => {
  const $ = cheerio.load(data, {
    normalizeWhitespace: true,
  });
  const massMediaParser = require(`${path.join(__dirname, 'parsers')}/${item.name}`);
  massMediaParser.toParse($, item, (error, news) => {
    if (error) {
      cb(error);
      return;
    }
    cb(null, news);
  });
};
