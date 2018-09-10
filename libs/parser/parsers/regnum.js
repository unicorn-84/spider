const newsChecker = require('../newsChecker');

module.exports.toParse = ($, item, cb) => {
  const news = [];
  const mainBlock = $('.news-container');
  if (mainBlock.html() === null) {
    cb(`${item.name}: '.news-container' not found`);
    return;
  }
  const newsList = mainBlock.find('.news-container-item').filter(i => i <= 3);
  newsList.each(function toGetNews() {
    news.push({
      id: Math.floor((Math.random() * 100) + 1),
      url: item.url,
      name: item.name,
      brand: item.brand,
      title: newsChecker.toCheckNews($(this).find('.news-container-item__article-header').text()),
      link: newsChecker.toCheckNews($(this).attr('href')),
      section: newsChecker.toCheckNews($(this).find('.news-container-item__article-theme').text()),
    });
  });
  cb(null, news);
};
