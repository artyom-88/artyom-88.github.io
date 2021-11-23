import { BaseModel } from 'common/types/common.types';
import { BaseState } from 'common/types/store.types';
import { Moment } from 'moment';

export interface CareerBase extends BaseModel {
  description: string;
  post: string;
  site: string;
  tools: string;
}

export interface CareerDTO extends CareerBase {
  endDate: string | null;
  startDate: string;
}

export interface CareerModel extends CareerBase {
  endDate: Moment;
  startDate: Moment;
}

export interface CareerData {
  list: CareerModel[];
}

export type CareerState = BaseState<CareerData>;