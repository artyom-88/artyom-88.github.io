import Typography from '@material-ui/core/Typography';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { LoadingIndicator } from 'src/components/Navigation';
import { isLoading } from 'src/selectors';
import { IState } from 'src/types';
import useStyles from './styles';

/**
 * Container properties interface
 */
interface IProperties {
  title?: string;
}

/**
 * Page container with title
 */
const Container: FunctionComponent<IProperties> = ({ children, title }: PropsWithChildren<IProperties>) => {
  const classes = useStyles();
  const loading = useSelector<IState, boolean>(isLoading);
  return (
    <div className={classes.pageContainer}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {title && <Typography variant='h4'>{title}</Typography>}
          {children}
        </>
      )}
    </div>
  );
};

export default Container;
