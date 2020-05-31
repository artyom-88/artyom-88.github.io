import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon';

export interface IComponentWithIcon {
  Icon?: OverridableComponent<SvgIconTypeMap>;
}

export interface IPageProps extends IComponentWithIcon {
  id: string;
  name: string;
  url: string;
}

export interface IPageContainer extends IComponentWithIcon {
  title?: string;
}
