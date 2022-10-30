import { BaseModel } from 'common/types/common.types';
import { BaseState, ListReducer } from 'common/types/store.types';
import { Moment } from 'moment';

export interface CareerBase extends BaseModel {
  description: string | null;
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

export interface CareerReducer extends ListReducer<CareerState, CareerModel> {
  // empty
}
