import { BLANK } from 'common/constants/html-constants';

export const openWindow = (url: string, target = BLANK): void => {
  window.open(url, target);
};
