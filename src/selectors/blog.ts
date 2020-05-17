import { BlogModel } from 'src/model';
import { IState } from 'src/types';

export const getBlogListItems = ({ blog }: IState): BlogModel[] => blog.items;
