const DATE_FORMAT = { month: 'long', year: 'numeric' };

export default class DateUtil {
  /**
   * Create Date from date string.
   * @param dateStr source string with %YYYY-MM-DD% format. Day is optional.
   */
  public static parseDateFromString(dateStr: string): Date | null {
    if (!dateStr) {
      return null;
    }
    const arr = dateStr.split('-');
    const year = arr[0];
    const month = arr[1];
    const day = arr[2] || '1';
    if (!year || !month) {
      return null;
    }
    return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
  }

  public static format(dateStr: string): string {
    const date = DateUtil.parseDateFromString(dateStr);
    return date
      ? new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }).format(date)
      : '';
  }

  /**
   * Career dates formatting
   * @param {Date} start - Star date
   * @param {Date} end - End date
   * @param {DateTimeFormatOptions} format - dates format
   */
  public static prepareDates(start: Date, end: Date, format: Intl.DateTimeFormatOptions = DATE_FORMAT): string {
    if (start) {
      const startDate = new Date(start);
      const string1 = startDate.toLocaleDateString('en-US', format);
      if (end) {
        const endDate = new Date(end);
        return `${string1} - ${endDate.toLocaleDateString('en-US', format)}`;
      }
      return `Since ${string1}`;
    }
    return '';
  }
}
