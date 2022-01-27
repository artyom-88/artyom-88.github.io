import { ListActions, ListData, ListSelectors } from 'common/types/list.types';
import { RootState } from 'common/types/store.types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useListItems<TState, TModel>(
  actions: ListActions<TState, TModel>,
  selectors: ListSelectors<TModel>
): ListData<TModel> {
  const dispatch = useDispatch();
  const items = useSelector<RootState, TModel[]>(selectors.selectList);
  const isLoading = useSelector<RootState, boolean>(selectors.isListLoading);

  useEffect(() => {
    dispatch(actions.loadList());
    return () => {
      dispatch(actions.clearList());
    };
  }, [dispatch]);

  return { isLoading, items };
}
