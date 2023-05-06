import {combineReducers, createStore} from 'redux';
import authReducer from '../reducers/Auth.reducer';

const rootRedducer = combineReducers({
  auth: authReducer,
});

let store = createStore(rootRedducer);

export default store;
