import { BlogModel } from 'model';
import { IState } from 'types';

export const getBlogListItems = ({ blog }: IState): BlogModel[] => blog.items;
