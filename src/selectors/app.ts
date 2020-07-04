import { IState } from 'types';

export const isLoading = ({ app }: IState): boolean => app.loading;
