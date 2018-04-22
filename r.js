const switcher = require("./switcher");

module.exports = ($, media) => {
  const news = switcher($, media);
  news.map((i) => {
    const item = i;
    item.name = media.name;
    item.url = media.url;
    item.rus = media.rus;
    return item;
  });
  return Promise.resolve(news);
};
