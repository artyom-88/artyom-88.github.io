import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import IState from '../../interface/IState';
import * as actions from '../../actions';
import LoadingIndicator from '../Navigation/LoadingIndicator';
import './Container.scss';

/**
 * Container properties interface
 */
interface IProperties {
  title?: string;
  children?: ReactNode | ReactNode[];
  loading?: boolean;
  narrow: boolean;
}

const mapStateToProps = ({ app: { loading, narrow } }: IState) => ({ loading, narrow });

const actionCreators = {
  appLoading: actions.appLoading,
};

/**
 * Page container with title
 */
const Container = (props: IProperties) => {
  const { children, loading, narrow, title } = props;
  const contentClass = `flexBox flexColumn page-container__root${narrow ? '--narrow' : ''}`;
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
