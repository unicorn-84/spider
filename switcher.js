const parser = require("./modules/parser");

module.exports = ($, media) => {
  let news;
  switch (media.name) {
    case "tass":
      news = parser.tass($, media.main);
      break;
    case "ria":
      news = parser.ria($, media.main);
      break;
    default:
      news = [];
  }
  return news;
};
