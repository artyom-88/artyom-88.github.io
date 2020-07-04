import { CareerModel } from 'model';
import { IState } from 'types';

export const getCareerListItems = ({ career }: IState): CareerModel[] => career.items;
