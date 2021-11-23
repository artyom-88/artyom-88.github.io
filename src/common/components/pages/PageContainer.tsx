import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { IPageContainer } from 'common/components/pages/Pages.types';
import useIsNarrow from 'common/hooks/useIsNarrow';
import { PropsWithChildren, ReactElement } from 'react';
import useStyles from './PageContainer.styles';

/**
 * Page container with title
 */
const PageContainer = ({ children, centerTitle, Icon, title }: PropsWithChildren<IPageContainer>): ReactElement => {
  const classes = useStyles();
  const justifyContent = centerTitle ? 'center' : 'flex-start';
  const narrow = useIsNarrow();
  return (
    <Paper className={classes.pageContainer} square>
      <Box px={narrow ? 2 : 4}>
        <Box display='flex' alignItems='center' justifyContent={justifyContent}>
          {Icon && <Icon fontSize='large' className={classes.pageContainerIcon} />}
          {title && (
            <Typography variant='h5' className={classes.pageContainerTitle}>
              {title}
            </Typography>
          )}
        </Box>
        {children}
      </Box>
    </Paper>
  );
};

export default PageContainer;