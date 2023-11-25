import { ReactElement, ReactNode } from 'react';

import { Card, Typography } from 'antd';

import PageContainer from 'common/components/PageContainer';
import { BLANK, REL } from 'common/constants/html-constants';
import { CAREER_PAGE_META } from 'common/constants/pages-constants';

const prepareTitle = (site: string, title: string, className: string): ReactNode => {
  const header = <Typography.Title className={className}>{title}</Typography.Title>;
  return site ? (
    <a href={site} target={BLANK} rel={REL} title='Click for details'>
      {header}
    </a>
  ) : (
    header
  );
};

const itemsMock = { isLoading: false, items: [] };

const Career = (): ReactElement => {
  const { isLoading, items } = itemsMock;
  return (
    <PageContainer isLoading={isLoading} title={CAREER_PAGE_META.name} Icon={CAREER_PAGE_META.Icon}>
      {items.map((item) => {
        const { _id: id, site, title, post, description, tools } = item;
        return (
          <div key={id} className=''>
            <Card>
              <div className=''>
                {prepareTitle(site, title, '')}
                <Typography.Title className=''>{title}</Typography.Title>
                <Typography.Title>Post:&nbsp;{post}</Typography.Title>
                <Typography.Title>{description}</Typography.Title>
                <div className='ag-flexbox ag-flexColumn'>
                  <Typography.Title>Tools:&nbsp;{tools}</Typography.Title>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </PageContainer>
  );
};

export default Career;
