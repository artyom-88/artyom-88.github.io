import type { JSX } from 'react';

import Spin from 'antd/lib/spin';

const LoadingPage = (): JSX.Element => (
  <div className='flex'>
    <Spin size='large' />;
  </div>
);

export default LoadingPage;
