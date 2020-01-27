/**
 * Navigation state structure interface
 */
export interface INavigationState {
  activePage: string;
}

/**
 * Application state structure interface
 */
export default interface IState {
  navigation: INavigationState;
}