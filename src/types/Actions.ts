import { AnyAction } from 'redux';
import { BlogModel, CareerModel } from 'src/model';

export interface IAppLoadingAction extends AnyAction {
  loading: boolean;
}

export interface IErrorAction extends AnyAction {
  error: string;
}

export interface ILoadBlogListSuccessAction extends AnyAction {
  items: BlogModel[];
}

export interface ILoadCareerListSuccessAction extends AnyAction {
  items: CareerModel[];
}

export type AppActionTypes = IAppLoadingAction | ILoadBlogListSuccessAction | ILoadCareerListSuccessAction;

export type BlogActionsType = ILoadBlogListSuccessAction | IErrorAction;

export type CareerActionsType = ILoadCareerListSuccessAction | IErrorAction;
