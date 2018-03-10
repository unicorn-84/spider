const fs = require('fs');
const config = require('../config');
const path = require('path');

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const dir = path.join(__dirname, `../../${config.get('logDir')}`);
const name = `${day}-${month}-${year}.log`;
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const pattern = `[${hours}:${minutes}:${seconds}]`;

function appendFile(content, cb) {
  fs.appendFile(`${dir}/${name}`, `${pattern} ${content}\n`, (error) => {
    if (error) {
      cb(error);
      return;
    }
    cb(null);
  });
}

function makeDir(content, cb) {
  fs.mkdir(dir, (error) => {
    if (error) {
      cb(error);
      return;
    }
    appendFile(content, cb);
  });
}

function checkDirectory(content, cb) {
  fs.access(dir, (error) => {
    if (error && error.code === 'ENOENT') {
      makeDir(content, cb);
      return;
    } else if (error) {
      cb(error);
      return;
    }
    appendFile(content, cb);
  });
}

module.exports.log = (content) => {
  checkDirectory(content, (error) => {
    if (error) {
      console.error(error);
    }
  });
};
