import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { LoadingIndicator } from 'src/components/Navigation';
import { IPageContainer } from 'src/components/Pages';
import { isLoading } from 'src/selectors';
import { IState } from 'src/types';
import useStyles from './styles';

/**
 * Page container with title
 */
const Container: FunctionComponent<IPageContainer> = ({ children, Icon, title }: PropsWithChildren<IPageContainer>) => {
  const classes = useStyles();
  const loading = useSelector<IState, boolean>(isLoading);
  return (
    <Paper className={classes.pageContainer} square>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Box display='flex' alignItems='center'>
            {Icon && <Icon fontSize='large' className={classes.pageContainerIcon} />}
            {title && (
              <Typography variant='h5' className={classes.pageContainerTitle}>
                {title}
              </Typography>
            )}
          </Box>
          {children}
        </>
      )}
    </Paper>
  );
};

export default Container;
