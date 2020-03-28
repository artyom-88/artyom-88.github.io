/**
 * Base interface of Blog record
 */
export interface IBlog {
  id: string;
  title: string;
  year: number;
  month: number;
  day: number;
  link: string;
  linkCaption: string;
}

/**
 * Base interface of Blog detail record
 */
export interface IBlogDetail {
  id: string;
}

export interface IBlogItems {
  [key: string]: IBlog;
}

export interface IBlogDetailItems {
  [key: string]: IBlogDetail;
}

export interface IBlogProps {
  items: IBlogItems;
  detail: IBlogDetailItems;
}
