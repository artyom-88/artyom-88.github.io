import { NAVIGATE } from "../constants/ActionTypes";
import { INavigateAction } from "../interface/Actions";
import { INavigationState } from "../interface/IState";

/**
 * Navigation actions reducer
 * @param {INavigationState} state current state
 * @param {INavigateAction} action current action
 */
export const navigation = (state: INavigationState = { activePage: '' }, { payload, type }: INavigateAction): INavigationState => {
  if (type === NAVIGATE) {
    const { activePage } = payload;
    return { activePage };
  }
  return state;
};
