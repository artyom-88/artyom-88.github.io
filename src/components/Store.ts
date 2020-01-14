import { Action, combineReducers, createStore } from 'redux';

const blog = (state = {}, action: Action) => {
    return state;
};

const contacts = (state = {}, action: Action) => {
    return state;
};

/**
 * Application data store
 */
export default createStore(combineReducers({ blog, contacts }));