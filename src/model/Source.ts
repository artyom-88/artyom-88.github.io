import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://shielded-brushlands-46595.herokuapp.com';
const REQUEST_CONFIG = { headers: { 'x-requested-with': 'xhr' } };

/**
 * Data source implementation
 */
const Source = <TPage>(endpoint: string, beforeLoad: () => void, afterLoad: (data: TPage[]) => void) => {
  return {
    /**
     * Load all data items
     */
    loadList(): void {
      beforeLoad();
      axios.get<TPage[]>(`${API_URL}/${endpoint}/`, REQUEST_CONFIG)
        .then(({ data }: AxiosResponse<TPage[]>) => {
          afterLoad(data);
        })
        .catch(() => afterLoad([]));
    },

    /**
     * Load single data item
     * @param {String} id of the item
     */
    loadById(id: string): void {
      beforeLoad();
      axios.get<TPage>(`${API_URL}/${endpoint}/${id}`, REQUEST_CONFIG)
        .then(({ data }: AxiosResponse<TPage>) => {
          afterLoad([data]);
        })
        .catch(() => afterLoad([]));
    },
  };
};

/**
 * Data source builder
 */
const create = <TPage>() => {
  let end: string;
  let before: () => void;
  let after: (data: TPage[]) => void;
  return {
    endpoint(value: string) {
      end = value;
      return this;
    },
    beforeLoad(value: () => void) {
      before = value;
      return this;
    },
    afterLoad(value: (data: TPage[]) => void) {
      after = value;
      return this;
    },
    build: () => Source<TPage>(end, before, after),
  };
};

export default create;