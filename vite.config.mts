import { resolve } from 'node:path';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv, type PluginOption, type UserConfig } from 'vite';
import svg from 'vite-plugin-svgo';

const DEFAULT_DOMAIN = 'artyom-88.github.io';

const DEFAULT_PORT = 8080;

const PROD = 'production';

const DEV = 'development';

// react chunk packages: react, react-dom, react-router, react-router-dom
const REACT_CHUNK_RE = /node_modules[\\/](?:react|react-dom|react-router|react-router-dom)(?:[\\/]|$)/;

// antd chunk packages: antd, @ant-design/*, @rc-component/*, rc-*
const ANTD_CHUNK_RE = /node_modules[\\/](?:antd|@ant-design\/[^\\/]+|@rc-component\/[^\\/]+|rc-[^\\/]+)(?:[\\/]|$)/;

// vendor chunk packages: @tanstack/react-query, @tanstack/query-core, dayjs, ky
const VENDORS_CHUNK_RE = /node_modules[\\/](?:@tanstack\/react-query|@tanstack\/query-core|dayjs|ky)(?:[\\/]|$)/;

const getIsDevelopment = (mode: string): boolean => mode !== PROD;

const defaultPlugins = [react(), svg()];

const getPlugins = (mode: string): PluginOption[] => {
  return mode === 'analyze'
    ? [...defaultPlugins, visualizer({ filename: './dist/report.html', gzipSize: true, open: true })]
    : getIsDevelopment(mode)
      ? [...defaultPlugins, basicSsl()]
      : defaultPlugins;
};

export default defineConfig(({ mode }): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const isDevelopment = getIsDevelopment(mode);
  const host = `${env.VITE_DOMAIN || DEFAULT_DOMAIN}`;
  const port = +(env.VITE_PORT || DEFAULT_PORT);
  return {
    mode: isDevelopment ? DEV : PROD,
    plugins: getPlugins(mode),
    resolve: {
      alias: {
        app: resolve(__dirname, 'src', 'app'),
        assets: resolve(__dirname, 'src', 'assets'),
        common: resolve(__dirname, 'src', 'common'),
        features: resolve(__dirname, 'src', 'features'),
        test: resolve(__dirname, 'src', 'test'),
      },
    },
    server: {
      host: host,
      port: port,
    },
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: 'react',
                priority: 3,
                test: REACT_CHUNK_RE,
              },
              {
                name: 'antd',
                priority: 2,
                test: ANTD_CHUNK_RE,
              },
              {
                name: 'vendors',
                priority: 1,
                test: VENDORS_CHUNK_RE,
              },
            ],
          },
        },
      },
      sourcemap: isDevelopment,
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/test-setup.ts',
      include: ['src/test/**/**test.{ts,tsx}'],
      coverage: {
        include: ['src'],
        exclude: ['src/test'],
        reporter: ['text', 'text-summary', 'html'],
        thresholds: {
          perFile: false,
          statements: 1,
          branches: 1,
          functions: 1,
          lines: 1,
        },
        provider: 'v8',
      },
    },
  };
});
