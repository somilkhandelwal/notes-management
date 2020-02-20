const chalk = require('chalk');

const version = 1;

const printColor = (color, text) => {
  return console.log(chalk[color](text));
}

module.exports = {
  version,
  printColor
}