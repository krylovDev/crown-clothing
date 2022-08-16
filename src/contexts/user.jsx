import { createContext, useEffect, useState } from 'react'
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/database/firebase";

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null
})

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const value = { currentUser, setCurrentUser }

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
		<UserContext.Provider value={ value }>
			{ children }
		</UserContext.Provider>
	)
}
