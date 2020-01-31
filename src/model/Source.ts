import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://shielded-brushlands-46595.herokuapp.com';
const REQUEST_CONFIG = { headers: { 'x-requested-with': 'xhr' } };

/**
 * Page source class
 * @abstract
 */
export default class Source<TPage = object> {
  private readonly endpoint: string;
  private readonly beforeLoad: () => void;
  private readonly afterLoad: (data: TPage[]) => void;

  constructor(endpoint: string, beforeLoad: () => void, afterLoad: (data: TPage[]) => void) {
    this.endpoint = endpoint;
    this.beforeLoad = beforeLoad;
    this.afterLoad = afterLoad;
  }

  /**
   * Get all records
   */
  public getList(): void {
    this.beforeLoad();
    axios.get<TPage[]>(`${API_URL}/${this.endpoint}/`, REQUEST_CONFIG)
      .then(({ data }: AxiosResponse<TPage[]>) => {
        this.afterLoad(data);
      })
      .catch(() => this.afterLoad([]));
  }

  /**
   * Get single record
   * @param {String} id to find record
   */
  public getById(id: string): void {
    this.beforeLoad();
    axios.get<TPage>(`${API_URL}/${this.endpoint}/${id}`, REQUEST_CONFIG)
      .then(({ data }: AxiosResponse<TPage>) => {
        this.afterLoad([data]);
      })
      .catch(() => this.afterLoad([]));
  }

}
