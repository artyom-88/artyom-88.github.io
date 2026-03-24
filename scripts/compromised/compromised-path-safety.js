const path = require('node:path');

const { DEFAULT_COMPROMISED_FILE, ROOT_DIR } = require('./compromised-script-constants');

function getCompromisedFilePath(args = process.argv.slice(2), defaultFile = DEFAULT_COMPROMISED_FILE) {
  let outPath;
  if (args.length > 0) {
    const filePath = args[0];
    outPath = path.isAbsolute(filePath) ? filePath : path.resolve(ROOT_DIR, filePath);
  } else {
    outPath = path.join(ROOT_DIR, defaultFile);
  }

  const relativeToRoot = path.relative(ROOT_DIR, outPath);
  if (path.isAbsolute(relativeToRoot) || relativeToRoot.startsWith('..')) {
    throw new Error('Compromised file path must be inside the project root/workspace');
  }

  return outPath;
}

module.exports = {
  getCompromisedFilePath,
};
