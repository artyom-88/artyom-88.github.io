import { Moment, utc } from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const DATE_STRING_MOCK = '2020-05-30';

export const CURRENT_DATE_MOCK: Moment = utc(DATE_STRING_MOCK, DATE_FORMAT);

export const INVALID_DATE: Moment = utc(null);
