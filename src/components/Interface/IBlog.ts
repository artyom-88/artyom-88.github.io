/**
 * Base interface of Blog record
 */
import IPageData from './IPageData';

export default interface IBlog extends IPageData {
    year: number;
    month: number;
    day: number;
    link: string;
    linkCaption: string;
}
