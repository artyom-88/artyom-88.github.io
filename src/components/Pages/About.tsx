import React, { FunctionComponent } from 'react';

import { bio } from 'src/assets';
import { PageContainer } from 'src/container';

import styles from './About.module.scss';

/**
 * About page component
 */
const About: FunctionComponent = () => (
  <PageContainer title='Artyom Ganev'>
    {bio.data.map((value: string, key: number) => (
      <div key={key} className={styles.item}>
        {value}
      </div>
    ))}
  </PageContainer>
);

export default About;
