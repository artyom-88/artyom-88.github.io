import type { BaseModel } from 'common/common-types';
import type { Dayjs } from 'dayjs';

export interface BlogBase extends BaseModel {
  link: string;
  linkCaption: string;
}

export interface BlogDTO extends BlogBase {
  date: string;
}

export interface BlogModel extends BlogBase {
  date: Dayjs;
}

export interface BlogItemProps {
  item: BlogModel;
}
