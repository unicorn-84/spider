const newsChecker = require('../newsChecker');

function toReplace(elem) {
  return elem.replace(/background-image:\s*url\(\s*['"]?(.*?)['"]?\s*\)[;]?/g, (match, str) => match.replace(match, str));
}

module.exports.toParse = ($, item, cb) => {
  const news = [];
  const mainBlock = $('.listing__rows_main-promobox').first();
  if (mainBlock.html() === null) {
    cb(`${item.name}: '.listing__rows_main-promobox' not found`);
    return;
  }
  const mainList = mainBlock.children('li').not('.listing__column_main-promobox_foreign-press');
  mainList.each(function toGetNews() {
    news.push({
      id: Math.floor((Math.random() * 100) + 1),
      url: item.url,
      name: item.name,
      brand: item.brand,
      title: newsChecker.toCheckNews($(this).find('a').eq(2).text()),
      link: newsChecker.toCheckNews($(this).find('a').first().attr('href'), item.url),
      image: toReplace(newsChecker.toCheckNews($(this).find('a').first().parent()
        .attr('style'))),
      section: newsChecker.toCheckNews($(this).find('a').eq(1).text()),
    });
  });
  cb(null, news);
};
