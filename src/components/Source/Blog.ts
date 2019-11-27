import axios from 'axios';
import PagesCache from '../Utils/PagesCache';
import IBlog from './IBlog';

const PAGE_NAME = 'blog';
const BASE_URL = `https://shielded-brushlands-46595.herokuapp.com/blog/`;
const REQUEST_CONFIG = { headers: { 'x-requested-with': 'xhr' } };
const CACHE = PagesCache.getInstance();

interface IListResponse {
    data: IBlog[];
}

interface IGetResponse {
    data: IBlog;
}

/**
 * Blog List Source
 */
export default class Blog {

    /**
     * Get all Blog records
     */
    public static getList(): Promise<IBlog[]> {
        const cachedData = CACHE.get<IBlog[]>(PAGE_NAME);
        if (cachedData) {
            return Promise.resolve(cachedData);
        }

        return new Promise((resolve) => {
            axios.get(BASE_URL, REQUEST_CONFIG)
                .then(({ data }: IListResponse = { data: [] }) => {
                    CACHE.set<IBlog[]>('blog', data);
                    resolve(data);
                })
                .catch(() => resolve([]));
        });
    }

    /**
     * Get single Blog record
     * @param {String} id to find record
     */
    public static getById(id: string): Promise<IBlog | void> {
        return new Promise((resolve) => {
            axios.get(`${BASE_URL}/${id}`, REQUEST_CONFIG)
                .then((res: IGetResponse) => {
                    resolve(res.data || null);
                })
                .catch(() => resolve());
        });
    }
}
