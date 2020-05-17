import { ActionCreator, AnyAction } from 'redux';
import { CareerModel } from 'src/model';
import { IErrorAction, ILoadCareerListSuccessAction } from 'src/types';

export const CAREER_LOAD_LIST = 'CAREER_LOAD_LIST';
export const CAREER_LOAD_LIST_SUCCESS = `${CAREER_LOAD_LIST}_SUCCESS`;
export const CAREER_LOAD_LIST_ERROR = `${CAREER_LOAD_LIST}_ERROR`;

export const careerLoadList: ActionCreator<AnyAction> = () => ({
  type: CAREER_LOAD_LIST,
});

export const careerLoadListSuccess: ActionCreator<ILoadCareerListSuccessAction> = (items: CareerModel[]) => ({
  type: CAREER_LOAD_LIST_SUCCESS,
  items,
});

export const careerLoadListError: ActionCreator<IErrorAction> = (error: string) => ({
  type: CAREER_LOAD_LIST_ERROR,
  error,
});
