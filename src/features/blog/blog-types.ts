import { Dayjs } from 'dayjs';

import { BaseModel } from 'common/common-types';

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
