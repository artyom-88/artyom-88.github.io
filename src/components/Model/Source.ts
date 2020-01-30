import axios, { AxiosResponse } from 'axios';
import PagesCache from '../Utils/PagesCache';

const REQUEST_CONFIG = { headers: { 'x-requested-with': 'xhr' } };
const CACHE = PagesCache.getInstance();

/**
 * Page source class
 * @abstract
 */
export default class Source<TPage = object> {
   private readonly pageName: string;
   private readonly baseUrl: string;

   constructor(pageName: string, baseUrl:
     string) {
      this.pageName =    pageName;
      this.baseUrl = baseUrl;
   }

   /**
    * Get all records
    */
   public getList(): Promise<TPage[]> {
      const cachedData = CACHE.get<TPage[]>(this.pageName);
      if (cachedData) {
         return Promise.resolve(cachedData);
      }

      return new Promise((resolve) => {
         axios.get<TPage[]>(this.baseUrl, REQUEST_CONFIG)
            .then(({ data }: AxiosResponse<TPage[]>) => {
               CACHE.set<TPage[]>(this.pageName, data);
               resolve(data);
            })
            .catch(() => resolve([]));
      });
   }

   /**
    * Get single record
    * @param {String} id to find record
    */
   public getById(id: string): Promise<TPage> {
      return new Promise((resolve) => {
         axios.get<TPage>(`${this.baseUrl}/${id}`, REQUEST_CONFIG)
            .then(({ data }: AxiosResponse<TPage>) => {
               resolve(data);
            })
            .catch(() => resolve());
      });
   }
}
