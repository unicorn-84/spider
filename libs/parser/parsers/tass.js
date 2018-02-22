const newsChecker = require('../newsChecker');

module.exports.toParse = ($, item, cb) => {
  const news = [];
  const mainBlock = $('.main-slider-items');
  const mainNews = mainBlock.find('.main-slider__item').first();
  const mainList = mainBlock.find('.main-slider__subitem').first().find('.single-item');
  news.push({
    id: Math.floor((Math.random() * 100) + 1),
    url: item.url,
    name: item.name,
    brand: item.brand,
    title: newsChecker.toCheckNews(mainNews.find('.title').text()),
    link: newsChecker.toCheckNews(mainNews.attr('href'), item.url),
    image: newsChecker.toCheckNews(mainNews.find('img').attr('src')),
  });
  mainList.each(function toGetNews() {
    news.push({
      id: Math.floor((Math.random() * 100) + 1),
      url: item.url,
      name: item.name,
      brand: item.brand,
      title: newsChecker.toCheckNews($(this).find('a').last().text()),
      link: newsChecker.toCheckNews($(this).find('a').last().attr('href'), item.url),
    });
  });
  cb(null, news);
};
