import { AnyAction } from 'redux';
import {
  Action,
  ActionWithPayload,
} from '../../utils/reducer/reducer.utils.types';

export enum CATEGORIES_ACTION_TYPES {
	FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START',
	FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
	FETCH_CATEGORIES_FAILED = 'category/FETCH_CATEGORIES_FAILED',
}

// __________ DATA STRUCTURE  __________
export interface CategoryItem {
	id: number
	imageUrl: string
	name: string
	price: number
}

export interface Category {
	title: string
	imageUrl: string
	items: CategoryItem[]
}

export interface CategoryMap {
	[key: string]: CategoryItem[]
}

// __________ ACTIONS  __________
/*
export type CategoryAction =
	FetchCategoriesStart
	| FetchCategoriesSuccess
	| FetchCategoriesFailed
*/

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

// __________ STATE  __________
export interface CategoriesState {
	readonly categories: Category[]
	readonly isLoading: boolean
	readonly error: Error | null
}
