import { createSelector } from 'reselect'

const selectCategoryReducer = (state) => state.categories

export const selectCategories = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => categoriesSlice.categories
)

const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories) => categories.reduce((acc, category) => {
			const {title, items} = category
			acc[title.toLowerCase()] = items
			return acc
		}, {})
)

const selectCategoriesIsLoading = createSelector(
	[selectCategoryReducer],
	({isLoading}) => isLoading
)

export {
	selectCategoriesMap,
	selectCategoriesIsLoading,
}
