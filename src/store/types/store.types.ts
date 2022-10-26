import { PersistConfig } from 'redux-persist';
import { rootReducer } from '../root.reducer';

export type RootState = ReturnType<typeof rootReducer>

export type PersistedConfig = PersistConfig<RootState> & {
	whitelist: (keyof RootState)[]
}
