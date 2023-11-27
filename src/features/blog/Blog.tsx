import { ReactElement } from 'react';

import { Card } from 'antd';

import PageContainer from 'common/components/PageContainer';
import { BLANK, REL } from 'common/constants/html-constants';
import { BLOG_PAGE_PROPS } from 'common/constants/pages-constants';

const itemsMock = { isLoading: false, items: [] };

const Blog = (): ReactElement => {
  const { isLoading, items } = itemsMock;
  return (
    <PageContainer isLoading={isLoading} title={BLOG_PAGE_PROPS.id} Icon={BLOG_PAGE_PROPS.Icon}>
      <div className='ag-flexbox ag-flexColumn'>
        {items.map((item) => {
          const { _id: id, title, link, linkCaption } = item;
          // TODO: move to separate component
          return (
            <div key={id} className=''>
              <Card>
                <div className=''>
                  <span>{item.date?.format('')}</span>
                  <span>{title}</span>
                  {link && (
                    <div className='ag-flexbox'>
                      <a href={link} target={BLANK} rel={REL} title='Click for details'>
                        <span>{linkCaption}</span>
                      </a>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default Blog;
