import { CareerModel } from 'src/model';
import { IState } from 'src/types';

export const getCareerListItems = ({ career }: IState): CareerModel[] => career.items;
