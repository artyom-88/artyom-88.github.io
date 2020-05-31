import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon/SvgIcon';

export interface IPageProps {
  id: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
  name: string;
  url: string;
}
