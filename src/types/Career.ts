import { CareerModel } from 'src/model';
import { IErrorState } from 'src/types';

export interface ICareerRawData {
  description: string;
  endDate: Date;
  _id: string;
  post: string;
  site: string;
  startDate: Date;
  title: string;
  tools: string;
}

export interface ICareerDetail {
  id: string;
}

export interface ICareerDetailItems {
  [key: string]: ICareerDetail;
}

export interface ICareerState extends IErrorState {
  items: CareerModel[];
  detail: ICareerDetailItems;
}
