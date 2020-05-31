import { AnyAction } from 'redux';
import { ANY_ACTION_MOCK, CAREER_ITEMS_MOCK, ERROR_MOCK } from 'src/__mocks__';
import {
  careerLoadList,
  careerLoadListError,
  careerLoadListSuccess,
  IErrorAction,
  ILoadCareerListSuccessAction,
} from 'src/actions';
import career, { initialState } from 'src/reducers/career';
import { ICareerState } from 'src/types';

describe('reducers', () => {
  describe('career', () => {
    it('should return initial state', () => {
      const state: ICareerState = career(undefined, ANY_ACTION_MOCK);
      expect(state).toMatchObject(initialState);
    });

    it('should return correct career loading state', () => {
      const action: AnyAction = careerLoadList();
      const state: ICareerState = career(initialState, action);
      expect(state).toMatchObject(initialState);
    });

    it('should return correct career load success state', () => {
      const action: ILoadCareerListSuccessAction = careerLoadListSuccess(CAREER_ITEMS_MOCK);
      const state: ICareerState = career(initialState, action);
      expect(state).toMatchObject({
        ...initialState,
        items: CAREER_ITEMS_MOCK,
      });
    });

    it('should return correct blog load error state', () => {
      const action: IErrorAction = careerLoadListError(ERROR_MOCK);
      const state: ICareerState = career(initialState, action);
      expect(state.error).toEqual(ERROR_MOCK);
    });
  });
});
