interface IValue {
    value: unknown;
    date: number;
}

/**
 * Simple memory cache for site pages
 * @singleton
 */
export default class PagesCache {

    /**
     * Get cache instance
     */
    public static getInstance(): PagesCache {
        if (!PagesCache.instance) {
            PagesCache.instance = new PagesCache();
        }

        return PagesCache.instance;
    }

    private static instance: PagesCache;
    private cache: Map<string, IValue>;

    private constructor() {
        this.cache = new Map<string, IValue>();
    }

    /**
     * Save value to cache
     * @param key
     * @param value to set
     */
    public set<T>(key: string, value: T): void {
        const date = new Date().getTime();
        this.cache.set(key, { value, date });
    }

    /**
     * Get value from cache
     * @param key
     */
    public get<T>(key: string): T | void {
        const cached = this.cache.get(key);
        return cached ? (cached.value as T) : undefined;
    }
}