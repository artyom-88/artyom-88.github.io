/**
 * Base interface of Career record
 */
export interface ICareer {
    description: string;
    endDate: Date;
    id: string;
    post: string;
    site: string;
    startDate: Date;
    title: string;
    tools: string;
}

/**
 * Base interface of Career detail record
 */
export interface ICareerDetail {
    id: string;
}

export interface ICareerItems {
    [key: string]: ICareer;
}

export interface ICareerDetailItems {
    [key: string]: ICareerDetail;
}

export interface ICareerProps {
  items: ICareerItems;
  detail: ICareerDetailItems;
}
