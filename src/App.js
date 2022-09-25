import Home from './pages/home/home'
import './categories.scss'
import { Route, Routes } from 'react-router-dom'
import Navigation from './pages/navigation/navigation'
import Authentication from "./pages/authentication/authentication";
import Shop from "./pages/shop/shop";
import Checkout from "./pages/checkout/checkout";
import {
	createUserDocumentFromAuth,
	getCategoriesAndDocuments,
	onAuthStateChangedListener
} from "./utils/database/firebase";
import { useEffect } from "react";
import { setCurrentUser } from "./store/user/user.actions";
import { useDispatch } from "react-redux";

const App = () => {
	const dispatch = useDispatch()

	// CurrentUser
	useEffect(() => {
		// Монтирование
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user)
			}
			dispatch(setCurrentUser(user))
		})
		// Размонтирование
		return unsubscribe // unmount effect
	}, [])

	return (
		<Routes>
			<Route path={'/'} element={<Navigation/>}>
				<Route index element={<Home/>}/>
				<Route path={'shop/*'} element={<Shop/>}/>
				<Route path={'auth'} element={<Authentication/>}/>
				<Route path={'checkout'} element={<Checkout/>}/>
			</Route>
		</Routes>
	)
}
export default App

