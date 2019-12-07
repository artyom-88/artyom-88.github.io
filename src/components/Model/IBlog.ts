/**
 * Base interface of Blog record
 */
export default interface IBlog {
    id: string;
    title: string;
    year: number;
    month: number;
    day: number;
    link: string;
    linkCaption: string;
}
