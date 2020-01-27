import { NAVIGATE } from "../constants/ActionTypes";
import { INavigateAction } from "../interface/Actions";

/**
 * Navigate action
 * @param {String} activePage new active page id
 * @return INavigateAction
 */
export const navigate = (activePage: string): INavigateAction => ({ payload: { activePage }, type: NAVIGATE });
