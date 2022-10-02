import { getCategoriesAndDocuments } from "../../utils/database/firebase"
import { fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess } from "./category.actions"
import {
	takeLatest,
	all,
	call,
	put
} from 'redux-saga/effects'
import { CATEGORIES_ACTION_TYPES } from "./category.types";

/* // Thunk-version
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

// action
function* fetchCategoriesAsync() {
	try {
		// call - вызов функции
		const categoriesArray = yield call(getCategoriesAndDocuments,'categories')
		yield put(fetchCategoriesSuccess(categoriesArray))
	} catch (error) {
		yield put(fetchCategoriesFailed(error))
	}
}

// dispatch(fetchCategoriesStart())
function* onFetchCategories() {
	// takeLatest принимает (action.type, action)
	yield takeLatest(
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
		fetchCategoriesAsync
	)
}

function* categoriesSaga() {
	// в all завершаются все генераторы, потом код идёт дальше ( аналог await )
	yield all([
		call(onFetchCategories)
	])
}

export default categoriesSaga
