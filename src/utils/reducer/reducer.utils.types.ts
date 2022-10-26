import { AnyAction } from 'redux';

export interface ActionWithPayload<T, P> {
	type: T
	payload: P
}

export interface Action<T> {
	type: T
}

/* Типизация redux-action для reducer
* AC - Action creator
* */
export type Matchable<AC extends () => AnyAction> = AC & {
	// Берём type из action-creator и присваиваем type
	type: ReturnType<AC>['type']
	// Указываем что возвращаемый тип это результирующий тип из action-creator
	match(action: AnyAction): action is ReturnType<AC>
}

// export function withMatcher<AC extends () => AnyAction
// & { type: string }>(actionCreator: AC): Matchable<AC>

// export function withMatcher<AC extends (...args: any[]) => AnyAction
// & { type: string }>(actionCreator: AC): Matchable<AC>

/* @example fetchCategoriesStart.type => CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
*  */
// eslint-disable-next-line @typescript-eslint/ban-types
export function withMatcher(actionCreator: Function) {
  const { type } = actionCreator();
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}
