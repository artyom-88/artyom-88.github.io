import React, { ReactNode, useContext } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import IState from '../../interface/IState';
import { NarrowContext } from '../App';
import LoadingIndicator from '../Navigation/LoadingIndicator';
import styles from './Container.module.scss';

/**
 * Container properties interface
 */
interface IProperties {
  title?: string;
  children?: ReactNode | ReactNode[];
  loading?: boolean;
}

const mapStateToProps = ({ app: { loading } }: IState) => ({ loading });

const actionCreators = {
  appLoading: actions.appLoading,
};

/**
 * Page container with title
 */
const Container = (props: IProperties) => {
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

export default connect(mapStateToProps, actionCreators)(Container);
