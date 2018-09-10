const newsChecker = require('../newsChecker');

module.exports.toParse = ($, item, cb) => {
  const news = [];
  const mainBlock = $('.widget6');
  if (mainBlock.html() === null) {
    cb(`${item.name}: '.widget6' not found`);
    return;
  }
  const mainList = mainBlock.find('.entry');
  mainList.each(function toGetNews() {
    news.push({
      id: Math.floor((Math.random() * 100) + 1),
      url: item.url,
      name: item.name,
      brand: item.brand,
      title: newsChecker.toCheckNews($(this).find('.entry_title').first().text()),
      link: newsChecker.toCheckNews($(this).find('a').first().attr('href'), item.url),
      image: newsChecker.toCheckNews($(this).find('img').first().attr('src')),
    });
  });
  cb(null, news);
};
