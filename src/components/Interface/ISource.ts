import IPageData from './IPageData';

/**
 * Basic data source interface
 */
export default interface ISource<TData extends IPageData> {
    getData(): Promise<TData[]>;
}