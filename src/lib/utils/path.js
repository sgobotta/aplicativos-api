const path = require('path');

module.exports = function (currentPath, pathToAssets) {
  const absolutePath = path.resolve('.').split(`${path.sep}`)[0];
  const resolvedPath = path.join(currentPath, pathToAssets);
  return `${absolutePath}${resolvedPath}`;
};
