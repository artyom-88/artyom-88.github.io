import { DEFAULT_DATE_FORMAT } from 'common/const/date.const';
import { CareerModel } from './career.types';

export const formatDates = (career: CareerModel): string => {
  if (career.startDate.isValid()) {
    const string1 = career.startDate.format(DEFAULT_DATE_FORMAT);
    if (career.endDate.isValid()) {
      return `${string1} - ${career.endDate.format(DEFAULT_DATE_FORMAT)}`;
    }
    return `Since ${string1}`;
  }
  return '';
};
