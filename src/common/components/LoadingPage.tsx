import type { JSX } from 'react';

import Spin from 'antd/es/spin';

const LoadingPage = (): JSX.Element => (
  <div className='flex flex-col w-full h-full align-middle justify-center'>
    <Spin size='large' />
  </div>
);

export default LoadingPage;
