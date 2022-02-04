import { ComponentWithIcon } from 'common/types/common.types';

export interface IPageContainer extends ComponentWithIcon {
  centerTitle?: boolean;
  description?: string;
  isLoading?: boolean;
  title?: string;
}
