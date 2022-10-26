import { Middleware } from 'redux';
import { RootState } from '../../store/types/store.types';

const loggerMiddleware: Middleware<undefined, RootState> = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action);

  console.log('next state: ', store.getState());
};

export default loggerMiddleware;
