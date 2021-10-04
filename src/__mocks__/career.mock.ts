import { DATE_STRING_MOCK } from '__mocks__/date.mock';
import { CareerDTO, CareerModel } from 'features/career/career.types';
import { utc } from 'moment';

export const CAREER_ID_MOCK = 'id';

export const CAREER_TITLE_MOCK = 'title';

export const CAREER_POST_MOCK = 'post';

export const CAREER_DESCRIPTION_MOCK = 'description';

export const CAREER_SITE_MOCK = 'site';

export const CAREER_TOOLS_MOCK = 'tools';

export const CAREER_RAW_ITEM_MOCK: CareerDTO = {
  _id: CAREER_ID_MOCK,
  description: CAREER_DESCRIPTION_MOCK,
  endDate: null,
  post: CAREER_POST_MOCK,
  site: CAREER_SITE_MOCK,
  startDate: DATE_STRING_MOCK,
  title: CAREER_TITLE_MOCK,
  tools: CAREER_TOOLS_MOCK,
};

export const CAREER_RAW_ITEMS_MOCK: readonly CareerDTO[] = [CAREER_RAW_ITEM_MOCK] as const;

export const CAREER_LIST_RESPONSE_MOCK = {
  data: CAREER_RAW_ITEMS_MOCK,
};

export const CAREER_ITEM_RESPONSE_MOCK = {
  data: CAREER_RAW_ITEM_MOCK,
};

export const CAREER_ITEM_MOCK: CareerModel = {
  _id: CAREER_ID_MOCK,
  description: CAREER_DESCRIPTION_MOCK,
  endDate: utc(null),
  post: CAREER_POST_MOCK,
  site: CAREER_SITE_MOCK,
  startDate: utc(DATE_STRING_MOCK),
  title: CAREER_TITLE_MOCK,
  tools: CAREER_TOOLS_MOCK,
};

export const CAREER_ITEMS_MOCK: readonly CareerModel[] = [CAREER_ITEM_MOCK] as const;
