/**
 * Base interface of Career record
 */
export default interface ICareer {
    description: string;
    endDate: Date;
    id: string;
    link: string;
    linkCaption: string;
    post: string;
    site: string;
    startDate: Date;
    title: string;
    tools: string;
}
