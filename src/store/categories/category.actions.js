// import { getCategoriesAndDocuments } from "../../utils/database/firebase";
import createAction from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

const fetchCategoriesStart = () => createAction(
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
)

const fetchCategoriesSuccess = (categoriesArray) => createAction(
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
	categoriesArray
)

const fetchCategoriesFailed = (error) => createAction(
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
	error
)

/*
const fetchCategoriesAsync = () => async (dispatch) => {
	dispatch(fetchCategoriesStart())
	try {
		const categoriesArray = await getCategoriesAndDocuments('categories')
		dispatch(fetchCategoriesSuccess(categoriesArray))
	} catch (error) {
		dispatch(fetchCategoriesFailed(error))
	}
}
*/

export {
	fetchCategoriesStart,
	fetchCategoriesSuccess,
	fetchCategoriesFailed,
	// fetchCategoriesAsync,
}
