import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';

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
  className: string;
}

export type Object<TValue = unknown> = Record<string, TValue>;
