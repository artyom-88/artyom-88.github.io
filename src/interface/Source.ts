/**
 * Data source interface
 */
export interface Source {
  /**
   * Load all data items
   */
  loadList(): void;

  /**
   * Load single data item
   * @param {String} id of the item
   */
  loadById(id: string): void;
}

export interface ISourceBuilder<TPage> {
  endpoint(value: string): ISourceBuilder<TPage>;

  beforeLoad(value: () => void): ISourceBuilder<TPage>;

  afterLoad(value: (data: TPage[]) => void): ISourceBuilder<TPage>;

  build(): Source;
}
