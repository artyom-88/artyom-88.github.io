import { ActionCreator, AnyAction } from 'redux';
import { IErrorAction, ILoadBlogListSuccessAction } from 'src/actions';
import { BlogModel } from 'src/model';

export const BLOG_LOAD_LIST = 'BLOG_LOAD_LIST';
export const BLOG_LOAD_LIST_SUCCESS = `${BLOG_LOAD_LIST}_SUCCESS`;
export const BLOG_LOAD_LIST_ERROR = `${BLOG_LOAD_LIST}_ERROR`;

export const blogLoadList: ActionCreator<AnyAction> = (): AnyAction => ({
  type: BLOG_LOAD_LIST,
});

export const blogLoadListSuccess: ActionCreator<ILoadBlogListSuccessAction> = (
  items: BlogModel[]
): ILoadBlogListSuccessAction => ({
  type: BLOG_LOAD_LIST_SUCCESS,
  items,
});

export const blogLoadListError: ActionCreator<IErrorAction> = (error: string): IErrorAction => ({
  type: BLOG_LOAD_LIST_ERROR,
  error,
});
