/**
 * Base interface of Career record
 */
import IPageData from './IPageData';

export default interface ICareer extends IPageData {
    description: string;
    endDate: Date;
    post: string;
    site: string;
    startDate: Date;
    tools: string;
}
