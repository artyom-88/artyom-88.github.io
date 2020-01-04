import axios, { AxiosResponse } from 'axios';
import IPageData from '../Interface/IPageData';
import ISource from '../Interface/ISource';
import PagesCache from '../Utils/PagesCache';

const REQUEST_CONFIG = { headers: { 'x-requested-with': 'xhr' } };
const CACHE = PagesCache.getInstance();

/**
 * Page source class
 * @abstract
 */
export default class BackendSource<TPageData extends IPageData> implements ISource<TPageData> {
    private readonly pageName: string;
    private readonly baseUrl: string;

    constructor(pageName: string, baseUrl: string) {
        this.pageName = pageName;
        this.baseUrl = baseUrl;
    }

    /**
     * Get all records
     */
    public getData(): Promise<TPageData[]> {
        const cachedData = CACHE.get<TPageData[]>(this.pageName);
        if (cachedData) {
            return Promise.resolve(cachedData);
        }

        return new Promise((resolve) => {
            axios.get<TPageData[]>(this.baseUrl, REQUEST_CONFIG)
                .then(({ data }: AxiosResponse<TPageData[]>) => {
                    CACHE.set<TPageData[]>(this.pageName, data);
                    resolve(data);
                })
                .catch(() => resolve([]));
        });
    }

    /**
     * Get single record
     * @param {String} id to find record
     */
    public getById(id: string): Promise<TPageData> {
        return new Promise((resolve) => {
            axios.get<TPageData>(`${ this.baseUrl }/${ id }`, REQUEST_CONFIG)
                .then(({ data }: AxiosResponse<TPageData>) => {
                    resolve(data);
                })
                .catch(() => resolve());
        });
    }
}
