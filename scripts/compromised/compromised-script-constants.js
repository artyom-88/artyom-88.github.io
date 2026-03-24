const path = require('node:path');

const ROOT_DIR = path.join(__dirname, '..', '..');
const DEFAULT_COMPROMISED_FILE = 'compromised.txt';
const DEFAULT_COMPROMISED_REFRESH_STATE_FILE = path.join('.codex', 'cache', 'compromised-refresh-state.json');
const ANY_VERSION = '*';
const COMPROMISED_FILE_MANUAL_ENTRY_PREFIX = '# manual-entry:';
const MANIFEST_DEPENDENCY_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies'];

module.exports = {
  ANY_VERSION,
  COMPROMISED_FILE_MANUAL_ENTRY_PREFIX,
  DEFAULT_COMPROMISED_FILE,
  DEFAULT_COMPROMISED_REFRESH_STATE_FILE,
  MANIFEST_DEPENDENCY_FIELDS,
  ROOT_DIR,
};
