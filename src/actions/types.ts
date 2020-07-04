import { BlogModel, CareerModel } from 'model';
import { AnyAction } from 'redux';

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

export type AppActionTypes = IAppLoadingAction | ILoadBlogListSuccessAction | ILoadCareerListSuccessAction | AnyAction;

export type BlogActionsType = ILoadBlogListSuccessAction | IErrorAction | AnyAction;

export type CareerActionsType = ILoadCareerListSuccessAction | IErrorAction | AnyAction;
