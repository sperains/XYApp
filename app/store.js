

import loggerMiddleware from './middleware/logger';
import {createStore,applyMiddleware,compose} from 'redux';
import rootReducer from './reducers/reducers';

// 扩展createStore
var enhancerCreateStore = applyMiddleware(
    loggerMiddleware
)(createStore);

const store = enhancerCreateStore(rootReducer);

export default store;