import { Action } from "redux";
import { NAVIGATE } from "../constants/ActionTypes";

/**
 * Navigate action interface
 */
export interface INavigateAction extends Action<typeof NAVIGATE> {
  payload: {
    /**
     * Active page id
     */
    activePage: string
  };
}