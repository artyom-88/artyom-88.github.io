import { Action } from "redux";
import { NAVIGATE } from "../constants/ActionTypes";

export interface INavigateAction extends Action<typeof NAVIGATE> {
  payload: { activePage: string };
}