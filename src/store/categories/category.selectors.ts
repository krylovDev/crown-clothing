import {createSelector} from 'reselect'
import {RootState} from '../types/store.types'
import {CategoriesState, CategoryMap} from './category.types'

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories

export const selectCategories = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => categoriesSlice.categories
)

const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories): CategoryMap =>
		categories.reduce((acc, category) => {
			const {title, items} = category
			acc[title.toLowerCase()] = items
			return acc
		}, {} as CategoryMap)
)

const selectCategoriesIsLoading = createSelector(
	[selectCategoryReducer],
	({isLoading}) => isLoading
)

export {
	selectCategoriesMap,
	selectCategoriesIsLoading,
}
