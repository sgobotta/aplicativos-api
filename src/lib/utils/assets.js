const fs = require('fs');

module.exports = function(fullPath, fileName) {

  const asset = fs.readFileSync(`${fullPath}${fileName}`, 'utf8');
  return JSON.parse(asset);
};
