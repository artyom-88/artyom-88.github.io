import { createSelector } from 'reselect';
import { IBlogItems, ICareerItems, IState } from 'src/interface';

export const blogItemsSelector = createSelector(
  ({ blog }: IState) => blog,
  (blog: { items: IBlogItems }) => Object.values(blog.items)
);

export const careerItemsSelector = createSelector(
  ({ career }: IState) => career,
  (career: { items: ICareerItems }) => Object.values(career.items)
);
