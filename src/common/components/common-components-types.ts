import { WithIcon } from 'common/common-types';

export interface PageContainerProps extends WithIcon {
  centerTitle?: boolean;
  description?: string;
  isLoading?: boolean;
  title: string;
}
