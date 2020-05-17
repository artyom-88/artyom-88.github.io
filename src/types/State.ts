import { IBlogState } from './Blog';
import { ICareerState } from './Career';

export interface IAppState {
  loading: boolean;
}

/**
 * Application state structure interface
 */
export interface IState {
  app: IAppState;
  blog: IBlogState;
  career: ICareerState;
}

export interface IErrorState {
  error: string;
}
