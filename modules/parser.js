// tass
module.exports.tass = ($, main) => {
  const mainBlock = $(main).first();
  const news = [];
  news.push({
    title: $(mainBlock).find(".title").text(),
    link: $(mainBlock).attr("href"),
    image: $(mainBlock).find("img").attr("src"),
  });
  return news;
};
// ria
module.exports.ria = ($, main) => {
  const mainBlock = $(main);
  const news = [];
  news.push({
    title: $(mainBlock).find(".b-index__main-news-title").text(),
    link: $(mainBlock).find("a").first().attr("href"),
    image: $(mainBlock).find("img").first().attr("src"),
  });
  return news;
};
