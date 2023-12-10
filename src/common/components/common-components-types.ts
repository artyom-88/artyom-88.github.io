import type { JSX } from 'react';

import { WithClassName, WithIcon } from 'common/common-types';

export interface PageTitleProps extends WithIcon {
  title: string;
}

export interface PageContainerProps extends PageTitleProps {
  description?: string;
  isLoading?: boolean;
}

export interface SocialButtonProps extends WithClassName {
  icon: JSX.Element;
  name: string;
  onClick: () => void;
}
