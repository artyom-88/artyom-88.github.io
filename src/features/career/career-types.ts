import { BaseModel } from 'common/common-types';

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
  endDate: unknown;
  startDate: unknown;
}
