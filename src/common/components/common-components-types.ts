import type { WithClassName, WithIcon } from 'common/common-types';
import type { JSX } from 'react';

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
