import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LoadingIndicator from 'common/components/layout/LoadingIndicator';
import { IPageContainer } from 'common/components/pages/Pages.types';
import { DEFAULT_DESCRIPTION } from 'common/const/pages.const';
import useIsNarrow from 'common/hooks/useIsNarrow';
import { PropsWithChildren, ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import useStyles from './PageContainer.styles';

/**
 * Page container with title
 */
const PageContainer = ({
  Icon,
  centerTitle,
  children,
  description = DEFAULT_DESCRIPTION,
  isLoading = false,
  title,
}: PropsWithChildren<IPageContainer>): ReactElement => {
  const classes = useStyles();
  const justifyContent = centerTitle ? 'center' : 'flex-start';
  const narrow = useIsNarrow();
  return (
    <>
      <Helmet>
        {title && <title>{title}</title>}
        <meta name='description' content={description} />
      </Helmet>
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
          {isLoading ? <LoadingIndicator /> : children}
        </Box>
      </Paper>
    </>
  );
};

export default PageContainer;
