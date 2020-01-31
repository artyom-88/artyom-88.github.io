import DateUtil from '../../utils/Date';

test('DateUtil.parseDateFromString:empty string', () => {
  expect(DateUtil.parseDateFromString('')).toBeNull();
});

test('DateUtil.parseDateFromString:invalid year', () => {
  expect(DateUtil.parseDateFromString('-02')).toBeNull();
});

test('DateUtil.parseDateFromString:invalid month', () => {
  expect(DateUtil.parseDateFromString('2019-')).toBeNull();
});

test('DateUtil.parseDateFromString:date without month', () => {
  expect(DateUtil.parseDateFromString('2019-05')).toEqual(new Date(2019, 4));
});

test('DateUtil.parseDateFromString:date with month', () => {
  expect(DateUtil.parseDateFromString('2019-05-12')).toEqual(new Date(2019, 4, 12));
});

test('DateUtil.prepareDates:two dates', () => {
  expect(DateUtil.prepareDates(new Date(2017, 1), new Date(2019, 11))).toEqual('February 2017 - December 2019');
});

test('DateUtil.prepareDates:left date', () => {
    // @ts-ignore
    expect(DateUtil.prepareDates(new Date(2017, 1))).toEqual('Since February 2017');
});

test('DateUtil.prepareDates:no dates', () => {
    // @ts-ignore
    expect(DateUtil.prepareDates()).toEqual('');
});

