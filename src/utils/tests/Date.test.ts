import { DateUtil } from 'src/utils';

describe('parseDateFromString', () => {
  test('empty string', () => {
    expect(DateUtil.parseDateFromString('')).toBeNull();
  });

  test('invalid year', () => {
    expect(DateUtil.parseDateFromString('-02')).toBeNull();
  });

  test('invalid month', () => {
    expect(DateUtil.parseDateFromString('2019-')).toBeNull();
  });

  test('date without month', () => {
    expect(DateUtil.parseDateFromString('2019-05')).toEqual(new Date(2019, 4));
  });

  test('date with month', () => {
    expect(DateUtil.parseDateFromString('2019-05-12')).toEqual(new Date(2019, 4, 12));
  });
});

describe('prepareDates', () => {
  test('two dates', () => {
    expect(DateUtil.prepareDates(new Date(2017, 1), new Date(2019, 11))).toEqual('February 2017 - December 2019');
  });

  test('left date', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(DateUtil.prepareDates(new Date(2017, 1))).toEqual('Since February 2017');
  });

  test('no dates', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(DateUtil.prepareDates()).toEqual('');
  });
});
