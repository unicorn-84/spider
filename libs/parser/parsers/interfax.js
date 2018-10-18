const newsChecker = require('../newsChecker');

module.exports.toParse = ($, item, cb) => {
  const news = [];
  const mainBlock = $('.v31__topnews');
  if (mainBlock.html() === null) {
    cb(`${item.name}: '.v31__topnews' not found`);
    return;
  }
  const mainList = mainBlock.find('.v31__psBlock > div > div');
  mainList.each(function toGetNews() {
    news.push({
      id: Math.floor((Math.random() * 100) + 1),
      url: item.url,
      name: item.name,
      brand: item.brand,
      title: newsChecker.toCheckNews($(this).find('h3').text()),
      link: newsChecker.toCheckNews($(this).find('a').first().attr('href'), item.url),
      image: newsChecker.toCheckNews($(this).find('img').first().attr('src'), item.url),
      section: newsChecker.toCheckNews($(this).find('.topnews__sec').text()),
    });
  });
  cb(null, news);
};

