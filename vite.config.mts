import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv, PluginOption, UserConfig } from 'vite';
import svg from 'vite-plugin-svgo';

const DEFAULT_DOMAIN = 'artyom-88.github.io';
const DEFAULT_PORT = 8080;
const PROD = 'production';
const DEV = 'development';

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
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
            vendors: ['@ant-design/icons', 'dayjs', '@tanstack/react-query', 'ky'],
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
