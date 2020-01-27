import { NAVIGATE } from "../constants/ActionTypes";

export const navigate = (activePage: string) => ({ payload: { activePage }, type: NAVIGATE });
