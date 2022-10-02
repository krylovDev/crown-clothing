import Home from './pages/home/home'
import './categories.scss'
import { Route, Routes } from 'react-router-dom'
import Navigation from './pages/navigation/navigation'
import Authentication from "./pages/authentication/authentication";
import Shop from "./pages/shop/shop";
import Checkout from "./pages/checkout/checkout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.actions";

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(checkUserSession())
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

