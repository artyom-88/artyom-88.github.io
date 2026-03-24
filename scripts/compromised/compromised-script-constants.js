const path = require('node:path');

const ROOT_DIR = path.join(__dirname, '..', '..');
const DEFAULT_COMPROMISED_FILE = 'compromised.txt';
const ANY_VERSION = '*';
const MANIFEST_DEPENDENCY_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies'];

module.exports = {
  ANY_VERSION,
  DEFAULT_COMPROMISED_FILE,
  MANIFEST_DEPENDENCY_FIELDS,
  ROOT_DIR,
};
