import { createContext, useEffect, useReducer } from 'react'
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/database/firebase";
import createAction from "../utils/reducer/reducer.utils";

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null
})

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
	const {type, payload} = action

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload
			}

		default:
			throw new Error(`Unhandled type ${type} in userReducer`)
	}
}

const INITIAL_STATE = {
	currentUser: null
}

export const UserProvider = ({children}) => {
	// const [currentUser, setCurrentUser] = useState(null)
	const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE)
	console.log('currentUser', currentUser)

	const setCurrentUser = (user) => dispatch(
		createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
	)
	const value = {currentUser, setCurrentUser}

	useEffect(() => {
		// Монтирование
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user)
			}
			setCurrentUser(user)
		})
		// Размонтирование
		return unsubscribe // unmount effect
	}, [])

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	)
}
