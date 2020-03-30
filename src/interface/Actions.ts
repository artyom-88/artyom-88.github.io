import { APP_LOADING, BLOG_LOAD_LIST, CAREER_LOAD_LIST } from 'src/actions';
import { BlogModel, CareerModel } from 'src/model';

export interface IAppLoading {
  type: typeof APP_LOADING;
  payload: { loading: boolean };
}

export interface ILoadBlogList {
  type: typeof BLOG_LOAD_LIST;
  payload: { items: BlogModel[] };
}

export interface ILoadCareerList {
  type: typeof CAREER_LOAD_LIST;
  payload: { items: CareerModel[] };
}

export type AppActionTypes = IAppLoading | ILoadBlogList | ILoadCareerList;

export type BlogActionsType = ILoadBlogList;

export type CareerActionsType = ILoadCareerList;
