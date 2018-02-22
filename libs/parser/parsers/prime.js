const newsChecker = require('../newsChecker');

module.exports.toParse = ($, item, cb) => {
  const news = [];
  const mainBlock = $('.main-news-carousel');
  const newsList = mainBlock.find('.main-news-carousel__item');
  newsList.each(function toGetNews() {
    news.push({
      id: Math.floor((Math.random() * 100) + 1),
      url: item.url,
      name: item.name,
      brand: item.brand,
      title: newsChecker.toCheckNews($(this).text()),
      link: newsChecker.toCheckNews($(this).find('a').attr('href'), item.url),
      image: newsChecker.toCheckNews($(this).find('img').attr('src'), item.url),
    });
  });
  cb(null, news);
};
