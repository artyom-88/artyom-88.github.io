import { AnyAction } from 'redux';
import { ANY_ACTION_MOCK } from 'src/__mocks__';
import {
  appLoading,
  blogLoadList,
  blogLoadListError,
  blogLoadListSuccess,
  careerLoadList,
  careerLoadListError,
  careerLoadListSuccess,
  IAppLoadingAction,
  IErrorAction,
  ILoadBlogListSuccessAction,
  ILoadCareerListSuccessAction,
} from 'src/actions';
import app, { initialState } from 'src/reducers/app';
import { IAppState } from 'src/types';

describe('reducers', () => {
  describe('app', () => {
    it('should return initial state', () => {
      const state: IAppState = app(undefined, ANY_ACTION_MOCK);
      expect(state).toMatchObject(initialState);
    });

    it('should return correct app loading state', () => {
      let action: IAppLoadingAction = appLoading(true);
      let state: IAppState = app(initialState, action);
      expect(state.loading).toBeTruthy();

      action = appLoading(false);
      state = app(initialState, action);
      expect(state.loading).toBeFalsy();
    });

    it('should return correct blog loading state', () => {
      const action: AnyAction = blogLoadList();
      const state: IAppState = app(initialState, action);
      expect(state.loading).toBeTruthy();
    });

    it('should return correct blog load success state', () => {
      const action: ILoadBlogListSuccessAction = blogLoadListSuccess();
      const state: IAppState = app(initialState, action);
      expect(state.loading).toBeFalsy();
    });

    it('should return correct blog load error state', () => {
      const action: IErrorAction = blogLoadListError();
      const state: IAppState = app(initialState, action);
      expect(state.loading).toBeFalsy();
    });

    it('should return correct career loading state', () => {
      const action: AnyAction = careerLoadList();
      const state: IAppState = app(initialState, action);
      expect(state.loading).toBeTruthy();
    });

    it('should return correct career load success state', () => {
      const action: ILoadCareerListSuccessAction = careerLoadListSuccess();
      const state: IAppState = app(initialState, action);
      expect(state.loading).toBeFalsy();
    });

    it('should return correct career load error state', () => {
      const action: IErrorAction = careerLoadListError();
      const state: IAppState = app(initialState, action);
      expect(state.loading).toBeFalsy();
    });
  });
});
