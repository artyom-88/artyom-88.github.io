import { IBlogProps } from './IBlog';
import { ICareerProps } from './ICareer';

export interface IAppState {
  loading: boolean;
}

/**
 * Application state structure interface
 */
export default interface IState {
  app: IAppState;
  blog: IBlogProps;
  career: ICareerProps;
}
