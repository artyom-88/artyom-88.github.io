import { PayloadAction } from '@reduxjs/toolkit';
import { CAREER_ITEMS_MOCK } from '__mocks__/career.mock';
import { ANY_ACTION_MOCK, ERROR_MOCK } from '__mocks__/common.mock';
import career, {
  careerLoadList,
  careerLoadListError,
  careerLoadListSuccess,
  initialState,
} from 'features/career/career.slice';
import { CareerModel, CareerState } from 'features/career/career.types';

describe('reducers', () => {
  describe('career', () => {
    it('should return initial state', () => {
      const state: CareerState = career(undefined, ANY_ACTION_MOCK);
      expect(state).toMatchObject(initialState);
    });

    it('should return correct career loading state', () => {
      const action: PayloadAction = careerLoadList(undefined);
      const state: CareerState = career(initialState, action);
      expect(state.meta.loading).toBeTruthy();
    });

    it('should return correct career load success state', () => {
      const action: PayloadAction<CareerModel[]> = careerLoadListSuccess(CAREER_ITEMS_MOCK);
      const state: CareerState = career(initialState, action);
      expect(state.data).toMatchObject({ list: CAREER_ITEMS_MOCK });
      expect(state.meta.loading).toBeFalsy();
    });

    it('should return correct blog load error state', () => {
      const action: PayloadAction<string> = careerLoadListError(ERROR_MOCK);
      const state: CareerState = career(initialState, action);
      expect(state.meta.error).toEqual(ERROR_MOCK);
      expect(state.meta.loading).toBeFalsy();
    });
  });
});
