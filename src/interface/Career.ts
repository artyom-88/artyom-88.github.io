import { CareerModel } from 'src/model';

export interface ICareerRawData {
  description: string;
  endDate: Date;
  id: string;
  post: string;
  site: string;
  startDate: Date;
  title: string;
  tools: string;
}

export interface ICareerDetail {
  id: string;
}

export interface ICareerItems {
  [key: string]: CareerModel;
}

export interface ICareerDetailItems {
  [key: string]: ICareerDetail;
}

export interface ICareerState {
  items: ICareerItems;
  detail: ICareerDetailItems;
}
