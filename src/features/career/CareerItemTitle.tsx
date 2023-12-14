import type { JSX } from 'react';

import Space from 'antd/es/space';
import Typography from 'antd/es/typography';

import { BLANK, REL } from 'common/constants/html-constants';
import { CareerItemProps } from 'features/career/career-types';

const CareerItemTitle = ({ item }: CareerItemProps): JSX.Element => {
  const { endDate, site, startDate, title } = item;
  const startDateText = startDate.format('MMMM Do, YYYY');
  const endDateText = endDate.isValid() ? endDate.format('MMMM Do, YYYY') : '';
  const dateRender = (
    <Typography.Text strong italic>
      {endDateText ? `${startDateText} - ${endDateText}` : `Since ${startDateText}`}
    </Typography.Text>
  );
  const companyRender = (
    <Typography.Text className='text-base' strong>
      {site ? (
        <a href={site} rel={REL} target={BLANK}>
          {title}
        </a>
      ) : (
        title
      )}
    </Typography.Text>
  );
  return (
    <Space wrap>
      {companyRender}
      {dateRender}
    </Space>
  );
};

export default CareerItemTitle;
