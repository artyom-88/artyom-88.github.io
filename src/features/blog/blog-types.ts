import { dayjs } from 'common/common-date';
import { BaseModel } from 'common/common-types';

export interface BlogBase extends BaseModel {
  link: string;
  linkCaption: string;
}

export interface BlogDTO extends BlogBase {
  date: string;
}

export interface BlogModel extends BlogBase {
  date: dayjs.Dayjs;
}
