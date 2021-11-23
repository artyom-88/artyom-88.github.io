import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon';

export interface ComponentWithIcon {
  Icon?: OverridableComponent<SvgIconTypeMap>;
}

export interface PageProps extends ComponentWithIcon {
  id: string;
  name: string;
  url: string;
}

export interface Clickable {
  onClick: () => void;
}

export interface BaseModel {
  _id: string;
  title: string;
}

export interface ComponentWithClassName {
  className?: string;
}
