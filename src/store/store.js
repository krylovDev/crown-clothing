import {
	compose,
	createStore,
	applyMiddleware
} from 'redux'
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import thunk from "redux-thunk";
import { rootReducer } from "./root.reducer";
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root.saga';

const persistConfig = {
	key: 'root',
	storage,
	// blacklist: ['user'] // user в state приходит из auth
	whitelist: ['cart'],
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [
	process.env.NODE_ENV !== 'production' && logger,
	// thunk
	sagaMiddleware
].filter(Boolean)

const composeEnhancer = (
	process.env.NODE_ENV !== 'production' &&
	window &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composeEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
