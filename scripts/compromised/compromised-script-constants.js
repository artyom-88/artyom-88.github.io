const path = require('node:path');

const ROOT_DIR = path.join(__dirname, '..', '..');
const DEFAULT_COMPROMISED_FILE = 'compromised.txt';
const ANY_VERSION = '*';
const COMPROMISED_FILE_REFRESHED_AT_PREFIX = '# refreshed-at:';
const COMPROMISED_FILE_MANUAL_ENTRY_PREFIX = '# manual-entry:';
const MANIFEST_DEPENDENCY_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies'];

module.exports = {
  ANY_VERSION,
  COMPROMISED_FILE_MANUAL_ENTRY_PREFIX,
  COMPROMISED_FILE_REFRESHED_AT_PREFIX,
  DEFAULT_COMPROMISED_FILE,
  MANIFEST_DEPENDENCY_FIELDS,
  ROOT_DIR,
};
