module.exports.toCheckNews = (item, url) => {
  if (typeof item === 'string') {
    if (url) {
      return `${url}${item}`;
    }
    return item;
  }
  return '';
};
