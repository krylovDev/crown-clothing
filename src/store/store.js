import {
	compose,
	createStore,
	applyMiddleware
} from 'redux'
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import { rootReducer } from "./root.reducer";

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['user'] // user в state приходит из auth
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [
	logger,
]

const composeEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composeEnhancers)

export const persistor = persistStore(store)
