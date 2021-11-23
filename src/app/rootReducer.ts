import blog from 'features/blog/blog.slice';
import career from 'features/career/career.slice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ blog, career });

export default rootReducer;
