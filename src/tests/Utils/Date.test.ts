import DateUtil from '../../components/Utils/Date';

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