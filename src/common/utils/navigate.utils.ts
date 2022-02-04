import { BLANK } from 'common/const/html.const';

export const openWindow = (url: string, target = BLANK): void => {
  window.open(url, target);
};
