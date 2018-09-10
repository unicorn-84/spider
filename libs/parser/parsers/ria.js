const newsChecker = require('../newsChecker');

module.exports.toParse = ($, item, cb) => {
  const news = [];
  const mainBlock = $('.b-index__main-wr');
  if (mainBlock.html() === null) {
    cb(`${item.name}: '.b-index__main-wr' not found`);
    return;
  }
  const mainNews = mainBlock.find('.b-index__main-news');
  const mainList = mainBlock.find('.b-index__main-list li');
  news.push({
    id: Math.floor((Math.random() * 100) + 1),
    url: item.url,
    name: item.name,
    brand: item.brand,
    title: newsChecker.toCheckNews(mainNews.find('.b-index__main-news-title').text()),
    link: newsChecker.toCheckNews(mainNews.find('a').first().attr('href'), item.url),
    image: newsChecker.toCheckNews(mainNews.find('img').first().attr('src')),
  });
  mainList.each(function toGetNews() {
    news.push({
      id: Math.floor((Math.random() * 100) + 1),
      url: item.url,
      name: item.name,
      brand: item.brand,
      title: newsChecker.toCheckNews($(this).text()),
      link: newsChecker.toCheckNews($(this).find('a').attr('href'), item.url),
    });
  });
  cb(null, news);
};
