import { ICareerProps } from './ICareer';
import { IBlogProps } from './IBlog';

export interface IAppState {
  narrow: boolean;
  loading: boolean;
}

/**
 * Application state structure interface
 */
export default interface IState {
  app: IAppState
  blog: IBlogProps,
  career: ICareerProps,
}