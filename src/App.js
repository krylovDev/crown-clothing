import Home from './pages/home/home'
import './categories.scss'
import { Route, Routes } from 'react-router-dom'
import Navigation from './pages/navigation/navigation'
import { pages } from './utils/pages/pages'
import Authentication from "./pages/authentication/authentication";

const App = () => {
	return (
		<Routes>
			<Route path={ '/' } element={ <Navigation/> }>
				{/**
				  @props {index} - Если путь такой же как и '/' , то отображаем <Home/>
				 */ }
				<Route index element={ <Home/> }/>
				<Route path={'auth'} element={ <Authentication/> }/>
				{ pages.map(({ path, component }) => (
					<Route
						key={path}
						path={ path }
						element={ component }
					/>
				)) }
			</Route>

		</Routes>
	)
}
export default App

