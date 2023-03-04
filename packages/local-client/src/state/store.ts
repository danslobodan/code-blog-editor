import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistMiddleware } from './middlewares/persist-middleware';

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(persistMiddleware, thunk))
);
