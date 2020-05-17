import { IState } from 'src/types';

export const isLoading = ({ app }: IState): boolean => app.loading;
