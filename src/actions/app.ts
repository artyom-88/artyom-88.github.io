import { IAppLoadingAction } from 'actions';
import { ActionCreator } from 'redux';

export const APP_LOADING = 'APP_LOADING';

export const appLoading: ActionCreator<IAppLoadingAction> = (loading: boolean): IAppLoadingAction => ({
  type: APP_LOADING,
  loading,
});
