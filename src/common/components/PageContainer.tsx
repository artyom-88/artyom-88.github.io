import { JSX, PropsWithChildren, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import App from 'antd/es/app';
import Card from 'antd/es/card';
import Space from 'antd/es/space';
import Typography from 'antd/es/typography';

import { PageContainerProps } from 'common/components/common-components-types';
import LoadingPage from 'common/components/LoadingPage';
import PageTitle from 'common/components/PageTitle';
import { BLANK, REL } from 'common/constants/html-constants';
import { DEFAULT_DESCRIPTION } from 'common/constants/pages-constants';

const SHOW_WARNING_TIMEOUT_MS = 1000;
const WARNING_DURATION_SEC = 20;

const PageContainer = ({
  icon,
  isLoading,
  children,
  description = DEFAULT_DESCRIPTION,
  title,
}: PropsWithChildren<PageContainerProps>): JSX.Element => {
  const { notification } = App.useApp();

  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        notification.warning({
          message: 'Sorry, I use Eco dynos in my Heroku account.',
          description: (
            <Typography.Text>
              <a href='https://devcenter.heroku.com/articles/eco-dyno-hours' target={BLANK} rel={REL}>
                Eco dynos
              </a>
              &nbsp;sleep automatically after a period of inactivity to conserve your dyno hours. So, the first page loading might
              take some extra time.
            </Typography.Text>
          ),
          duration: WARNING_DURATION_SEC,
        });
      }, SHOW_WARNING_TIMEOUT_MS);
      return () => {
        clearTimeout(timeout);
        notification.destroy();
      };
    }
  }, [isLoading, notification]);

  return (
    <Card className='flex flex-col grow w-full' title={<PageTitle icon={icon} title={title} />}>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Helmet>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Space className='flex flex-col grow' direction='vertical' size='large'>
          {children}
        </Space>
      )}
    </Card>
  );
};

export default PageContainer;
