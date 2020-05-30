import { ActionCreator } from 'redux';
import { IAppLoadingAction } from 'src/types';

export const APP_LOADING = 'APP_LOADING';

export const appLoading: ActionCreator<IAppLoadingAction> = (loading: boolean): IAppLoadingAction => ({
  type: APP_LOADING,
  loading,
});
