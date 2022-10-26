import { createSelector } from 'reselect';
import { RootState } from '../types/store.types';
import { UserState } from '../user/user.types';

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser,
);
