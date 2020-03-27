import React, { FunctionComponent, ReactNode, useContext } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';
import { NarrowContext } from 'components';
import { LoadingIndicator } from 'components/Navigation';
import IState, { IAppState } from 'interface/IState';

import styles from './Container.module.scss';

/**
 * Container properties interface
 */
interface IProperties {
  title?: string;
  children?: ReactNode | ReactNode[];
  loading?: boolean;
}

const mapStateToProps = ({ app: { loading } }: IState): IAppState => ({ loading });

const actionCreators = {
  appLoading: actions.appLoading,
};

/**
 * Page container with title
 */
const Container: FunctionComponent = (props: IProperties) => {
  const { children, loading, title } = props;
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

export default connect<IAppState, {}, IProperties, IState>(mapStateToProps, actionCreators)(Container);
