import { RootReducer } from 'common/types/store.types';
import blog from 'features/blog/blog.slice';
import career from 'features/career/career.slice';

const reducer: RootReducer = { blog, career };

export default reducer;
