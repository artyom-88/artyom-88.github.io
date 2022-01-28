import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PageContainer from 'common/components/pages/PageContainer';
import { BLANK, REL } from 'common/const/html.const';
import { CONTACTS_PAGE_META } from 'common/const/pages.const';
import useIsNarrow from 'common/hooks/useIsNarrow';
import useListItems from 'common/hooks/useListItems';
import selectors from 'features/contact/contact.selector';
import { actions } from 'features/contact/contact.slice';
import { ContactModel, ContactState } from 'features/contact/contact.types';
import { ReactElement, ReactNode, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import useStyles from './Contacts.styles';

const renderItems = (items: ContactModel[], narrow: boolean): ReactNode[] => {
  const padding = narrow ? 1 : 2;
  const justifyContent = narrow ? 'space-between' : 'center';
  return items.map(({ key, link, title, value }) => (
    <Typography key={key} variant='h6'>
      <Box alignItems='baseline' display='flex' justifyContent={justifyContent}>
        <Box p={padding}>{value}:&nbsp;</Box>
        <Box p={padding}>
          <a href={link} target={BLANK} rel={REL}>
            {title}
          </a>
        </Box>
      </Box>
    </Typography>
  ));
};

const Contacts = (): ReactElement => {
  const dispatch = useDispatch();
  const { isLoading, items } = useListItems<ContactState, ContactModel>(actions, selectors);
  const classes = useStyles();
  const narrow = useIsNarrow();
  const renderedItems = useMemo(() => renderItems(items, narrow), [items, narrow]);

  useEffect(() => {
    dispatch(actions.loadList());
    return () => {
      dispatch(actions.clearList());
    };
  }, [dispatch]);

  return (
    <PageContainer centerTitle isLoading={isLoading} title={CONTACTS_PAGE_META.name} Icon={CONTACTS_PAGE_META.Icon}>
      <Box className={classes.contactsContainer}>{renderedItems}</Box>
    </PageContainer>
  );
};

export default Contacts;
