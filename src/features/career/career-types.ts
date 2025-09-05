import type { BaseModel } from 'common/common-types';
import type { Dayjs } from 'dayjs';

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
