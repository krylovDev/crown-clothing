import { useSelector } from "react-redux";
import { Outlet } from 'react-router-dom'

import { ReactComponent as CrownLogo } from '../../assets/crown-logo.svg'
import { selectIsCartOpened } from "../../store/cart/cart.selectors";
import { selectCurrentUser } from "../../store/user/user.selectors";
import { signOutUser } from "../../utils/database/firebase";
import CartIcon from "../../components/cart-icon/cart-icon";
import './navigation.styles'
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import { pages } from "../../utils/pages/pages";
import { LogoContainer, NavigationContainer, NavLink, NavLinks } from "./navigation.styles";

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser)
	const isCartOpen = useSelector(selectIsCartOpened)

	return (
		<>
			<NavigationContainer>
				<LogoContainer to={'/'} className={'logo-container'}>
					<CrownLogo/>
				</LogoContainer>
				<NavLinks>

					{
						pages.map(({isNavigation, path, title, className}) => isNavigation && (
							<NavLink
								key={path}
								to={path}>
								{title}
							</NavLink>
						))
					}

					{
						currentUser
							? <NavLink as={'span'} onClick={signOutUser}> SIGN OUT</NavLink>
							: <NavLink to={'/auth'}>SIGN IN</NavLink>
					}

					<CartIcon/>
				</NavLinks>

				{isCartOpen && <CartDropdown/>}
			</NavigationContainer>
			<Outlet/> {/* Работает как children */}
		</>
	)
}

export default Navigation
