import { CURRENT_DATE_MOCK, DATE_STRING_MOCK, INVALID_DATE } from 'src/__mocks__/date';
import { CareerModel } from 'src/model';
import { ICareerRawData } from 'src/types';

export const CAREER_ID = 'id';

export const CAREER_TITLE = 'title';

export const CAREER_POST = 'post';

export const CAREER_DESCRIPTION = 'description';

export const CAREER_SITE = 'site';

export const CAREER_TOOLS = 'tools';

export const CAREER_RAW_ITEM_MOCK: ICareerRawData = {
  _id: CAREER_ID,
  description: CAREER_DESCRIPTION,
  endDate: null,
  post: CAREER_POST,
  site: CAREER_SITE,
  startDate: DATE_STRING_MOCK,
  title: CAREER_TITLE,
  tools: CAREER_TOOLS,
};

export const CAREER_RAW_ITEMS_MOCK: readonly ICareerRawData[] = [CAREER_RAW_ITEM_MOCK] as const;

export const CAREER_ITEM_MOCK: CareerModel = CareerModel.create()
  .description(CAREER_DESCRIPTION)
  .post(CAREER_POST)
  .site(CAREER_SITE)
  .tools(CAREER_TOOLS)
  .startDate(DATE_STRING_MOCK)
  .endDate(null)
  .id(CAREER_ID)
  .title(CAREER_TITLE)
  .build();

export const CAREER_ITEMS_MOCK: readonly CareerModel[] = [CAREER_ITEM_MOCK] as const;
