import { withMatcher } from '../../utils/reducer/reducer.utils.types';
import { createAction } from '../../utils/reducer/reducer.utils';
import {
  CATEGORIES_ACTION_TYPES,
  Category,
  FetchCategoriesStart,
  FetchCategoriesSuccess,
  FetchCategoriesFailed,
} from './category.types';

const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart => createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
  ),
);

const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: Category[]): FetchCategoriesSuccess => createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray,
  ),
);

const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCategoriesFailed => createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
    error,
  ),
);

export {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
};
