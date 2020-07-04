import { CareerModel } from 'model';
import { ICareerRawData } from 'types';

export const careerModelAdapter = (data: ICareerRawData): CareerModel => {
  const { _id, title, description, post, site, tools, startDate, endDate } = data;
  // prettier-ignore
  return CareerModel.create()
    .description(description)
    .post(post)
    .site(site)
    .tools(tools)
    .startDate(startDate)
    .endDate(endDate)
    .title(title)
    .id(_id)
    .build();
};

export const careerListAdapter = (items: readonly ICareerRawData[]): CareerModel[] => items.map(careerModelAdapter);
