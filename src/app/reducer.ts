import { RootReducer } from 'common/types/store.types';
import blog from 'features/blog/blog.slice';
import career from 'features/career/career.slice';
import contact from 'features/contact/contact.slice';

const reducer: RootReducer = { blog, career, contact };

export default reducer;
