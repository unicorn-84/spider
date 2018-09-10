const newsChecker = require('../newsChecker');

module.exports.toParse = ($, item, cb) => {
  const news = [];
  const mainBlock = $('.top-block');
  if (mainBlock.html() === null) {
    cb(`${item.name}: '.top-block' not found`);
    return;
  }
  const mainList = mainBlock.find('.article').filter(i => i <= 4);
  mainList.each(function toGetNews() {
    news.push({
      id: Math.floor((Math.random() * 100) + 1),
      url: item.url,
      name: item.name,
      brand: item.brand,
      title: newsChecker.toCheckNews($(this).find('img').first().attr('alt')),
      link: newsChecker.toCheckNews($(this).find('a').first().attr('href')),
      image: newsChecker.toCheckNews($(this).find('img').first().attr('src')),
    });
  });
  cb(null, news);
};
