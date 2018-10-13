import { SvgIconProps } from '@material-ui/core/SvgIcon';

export { default as PATH } from './Paths';
export { HEADER, PATH_INDEX } from './Consts';

export interface Header {
  [key: number]: HeaderInfo;
}

export interface HeaderInfo {
  title: string;
  path: string;
  left?: IconInfo[];
  right?: IconInfo[];
}

export interface IconInfo {
  icon: React.ComponentType<SvgIconProps>;
  path?: string;
  index?: number;
}
