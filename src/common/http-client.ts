import type { KyInstance } from 'ky';
import ky from 'ky';

export const httpClient: KyInstance = ky.create({
  headers: {
    'Content-Type': 'application/json',
  },
  prefixUrl: import.meta.env.VITE_API_URL,
  retry: 0,
});
