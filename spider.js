const fs = require("fs");
const util = require("util");
const request = require("./request");
const r = require("./r");

const writeFile = util.promisify(fs.writeFile);

module.exports = (media) => {
  console.log(`${media.name} started`);
  request(media.url)
    .then($ => r($, media))
    .then(news => writeFile(`${media.name}.json`, JSON.stringify(news)))
    .then(() => console.log(`${media.name} finished`))
    .catch(error => console.log(error));
};
