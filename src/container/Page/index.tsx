import React, { FunctionComponent, PropsWithChildren, useContext } from 'react';
import { useSelector } from 'react-redux';
import { NarrowContext } from 'src/components';
import { LoadingIndicator } from 'src/components/Navigation';
import { isLoading } from 'src/selectors';
import { IState } from 'src/types';
import styles from './Container.module.scss';

/**
 * Container properties interface
 */
interface IProperties {
  title?: string;
}

/**
 * Page container with title
 */
const Container: FunctionComponent<PropsWithChildren<IProperties>> = ({
  children,
  title,
}: PropsWithChildren<IProperties>) => {
  const loading = useSelector<IState, boolean>(isLoading);
  const narrow = useContext(NarrowContext);
  const contentClass = `flexBox flexColumn ${styles.container} ${narrow ? styles.narrow : styles.wide}`;
  return loading ? (
    <div className={contentClass}>
      <LoadingIndicator />
    </div>
  ) : (
    <div className={contentClass}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};

export default Container;
