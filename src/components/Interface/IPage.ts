import IPageData from './IPageData';

/**
 * Basic page interface
 */
export default interface IPage {
    getItems(): IPageData[];
}