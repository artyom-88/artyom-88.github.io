const { execSync } = require('node:child_process');

const { ROOT_DIR } = require('./compromised-script-constants');

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_RETRY_DELAY_MS = 1000;
const GITHUB_API_PER_PAGE = 100;
const RATE_LIMIT_ERROR = 'RATE_LIMIT';
const GITHUB_ADVISORY_TYPES = ['reviewed', 'malware'];
const BASE_GITHUB_API_HEADERS = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'compromised-packages-updater',
};

function buildGitHubAdvisoriesUrl(type) {
  return `https://api.github.com/advisories?per_page=${GITHUB_API_PER_PAGE}&ecosystem=npm&type=${type}`;
}

function getGitHubAuthToken(options = {}) {
  const { env = process.env, exec = execSync } = options;

  const envToken = env.GH_TOKEN || env.GITHUB_TOKEN;
  if (typeof envToken === 'string' && envToken.trim()) {
    return envToken.trim();
  }

  try {
    const ghToken = exec('gh auth token', {
      encoding: 'utf8',
      cwd: ROOT_DIR,
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    return typeof ghToken === 'string' && ghToken.trim() ? ghToken.trim() : null;
  } catch {
    return null;
  }
}

function getGitHubApiHeaders(options = {}) {
  const token = getGitHubAuthToken(options);
  return token ? { ...BASE_GITHUB_API_HEADERS, Authorization: `Bearer ${token}` } : BASE_GITHUB_API_HEADERS;
}

async function retryWithBackoff(fn, maxRetries = DEFAULT_MAX_RETRIES, initialDelay = DEFAULT_RETRY_DELAY_MS) {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        const delay = initialDelay * 2 ** attempt;
        console.warn(`⚠️  Attempt ${attempt + 1} failed: ${error.message}. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

function getNextGitHubPageUrl(linkHeader) {
  if (!linkHeader) {
    return null;
  }

  const nextPageEntry = linkHeader
    .split(',')
    .map((entry) => entry.trim())
    .find((entry) => entry.includes('rel="next"'));

  if (!nextPageEntry) {
    return null;
  }

  const match = nextPageEntry.match(/<([^>]+)>/);
  return match ? match[1] : null;
}

async function fetchGitHubAdvisoryType(type) {
  const advisories = [];
  let pageUrl = buildGitHubAdvisoriesUrl(type);
  const headers = getGitHubApiHeaders();

  while (pageUrl) {
    const response = await retryWithBackoff(
      async () => {
        const res = await fetch(pageUrl, { headers });

        if (!res.ok) {
          if (res.status === 403) {
            throw new Error(RATE_LIMIT_ERROR);
          }
          if (res.status >= 500) {
            throw new Error(`GitHub API server error: ${res.status} ${res.statusText}`);
          }
          throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
        }

        return res;
      },
      DEFAULT_MAX_RETRIES,
      DEFAULT_RETRY_DELAY_MS,
    );

    const data = await response.json();
    advisories.push(...(Array.isArray(data) ? data : data.items || []));
    pageUrl = getNextGitHubPageUrl(response.headers.get('link'));
  }

  return advisories;
}

async function fetchGitHubAdvisories() {
  const advisories = new Map();

  for (const type of GITHUB_ADVISORY_TYPES) {
    const typeAdvisories = await fetchGitHubAdvisoryType(type);
    typeAdvisories.forEach((advisory) => {
      const advisoryKey = advisory.ghsa_id ?? advisory.id ?? `${type}:${advisories.size}`;
      advisories.set(advisoryKey, advisory);
    });
  }

  return Array.from(advisories.values());
}

module.exports = {
  BASE_GITHUB_API_HEADERS,
  DEFAULT_MAX_RETRIES,
  DEFAULT_RETRY_DELAY_MS,
  GITHUB_ADVISORY_TYPES,
  GITHUB_API_PER_PAGE,
  RATE_LIMIT_ERROR,
  buildGitHubAdvisoriesUrl,
  fetchGitHubAdvisories,
  fetchGitHubAdvisoryType,
  getGitHubApiHeaders,
  getGitHubAuthToken,
  getNextGitHubPageUrl,
  retryWithBackoff,
};
