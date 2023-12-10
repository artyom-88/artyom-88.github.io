import { Dayjs } from 'dayjs';

import { BaseModel } from 'common/common-types';

export interface CareerBase extends BaseModel {
  description: string | null;
  post: string;
  site?: string;
}

export interface CareerDTO extends CareerBase {
  endDate: string | null;
  startDate: string;
  tools: string | string[];
}

export interface CareerModel extends CareerBase {
  endDate: Dayjs;
  startDate: Dayjs;
  tools: string[];
}

export interface CareerItemProps {
  item: CareerModel;
}
