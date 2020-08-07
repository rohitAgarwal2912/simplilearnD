import { combineReducers } from 'redux';
import { toasts } from './reducers/toast';
import {error} from './reducers/error';
import {userdetail} from './reducers/userdetail';


const rootReducer = combineReducers({
    toasts,
    error,
    userdetail
});

export default rootReducer;