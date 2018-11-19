const path = require('path');

module.exports = {
  process(src, filename, config, options) { /* eslint-disable-line */
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  }
};
