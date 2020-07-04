import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { LoadingIndicator } from 'components/Navigation';
import { IPageContainer } from 'components/Pages';
import useStyles from 'components/Pages/PageContainer.styles';
import React, { FC, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { isLoading } from 'selectors';
import { IState } from 'types';

/**
 * Page container with title
 */
const PageContainer: FC<IPageContainer> = ({
  children,
  centerTitle,
  Icon,
  title,
}: PropsWithChildren<IPageContainer>) => {
  const classes = useStyles();
  const loading = useSelector<IState, boolean>(isLoading);
  const justifyContent = centerTitle ? 'center' : 'flex-start';
  return (
    <Paper className={classes.pageContainer} square>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Box display='flex' alignItems='center' justifyContent={justifyContent}>
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

export default PageContainer;
