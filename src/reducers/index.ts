import { combineReducers } from 'redux';
import app from './app';
import blog from './blog';
import career from './career';

export default combineReducers({ app, blog, career });
