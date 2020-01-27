import { NAVIGATE } from "../constants/ActionTypes";
import { INavigateAction } from "../interface/Actions";

export const navigation = (state = '', { payload, type }: INavigateAction) => {
  if (type === NAVIGATE) {
    const { activePage } = payload;
    return { activePage };
  }
  return state;
};
