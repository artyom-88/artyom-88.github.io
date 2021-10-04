import { DEFAULT_DATE_FORMAT } from 'common/const/date.const';
import { utc } from 'moment';
import { CareerDTO, CareerModel } from './career.types';

export const careerModelAdapter = ({
  _id,
  description,
  endDate,
  post,
  site,
  startDate,
  title,
  tools,
}: CareerDTO): CareerModel => ({
  _id,
  description,
  endDate: utc(endDate, DEFAULT_DATE_FORMAT),
  post,
  site,
  startDate: utc(startDate, DEFAULT_DATE_FORMAT),
  title,
  tools,
});

export const careerListAdapter = (items: readonly CareerDTO[]): CareerModel[] => items.map(careerModelAdapter);
