import { CareerModel } from 'src/model';
import { IErrorState } from 'src/types';

export interface ICareerRawData {
  _id: string;
  description: string;
  endDate: string | null;
  post: string;
  site: string;
  startDate: string;
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
