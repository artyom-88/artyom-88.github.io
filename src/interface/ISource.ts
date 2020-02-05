/**
 * Data source interface
 */
export interface ISource {
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