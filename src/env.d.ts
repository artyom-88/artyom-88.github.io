/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_DOMAIN: string;
  readonly VITE_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
