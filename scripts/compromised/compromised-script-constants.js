const path = require('node:path');

const ROOT_DIR = path.join(__dirname, '..', '..');
const DEFAULT_MAX_BUFFER_SIZE = 10 * 1024 * 1024; // 10MB
const DEFAULT_COMPROMISED_FILE = 'compromised.txt';
const ANY_VERSION = '*';
const MANIFEST_DEPENDENCY_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies'];

module.exports = {
  ANY_VERSION,
  DEFAULT_COMPROMISED_FILE,
  DEFAULT_MAX_BUFFER_SIZE,
  MANIFEST_DEPENDENCY_FIELDS,
  ROOT_DIR,
};
