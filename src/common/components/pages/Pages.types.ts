import { ComponentWithIcon } from 'common/types/common.types';

export interface IPageContainer extends ComponentWithIcon {
  centerTitle?: boolean;
  isLoading?: boolean;
  title?: string;
}
