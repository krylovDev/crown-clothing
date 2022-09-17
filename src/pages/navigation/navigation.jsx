import { Link, Outlet } from 'react-router-dom'

import { ReactComponent as CrownLogo } from '../../assets/crown-logo.svg'
import { useContext } from "react";
import { UserContext } from "../../contexts/user";
import { signOutUser } from "../../utils/database/firebase";
import CartIcon from "../../components/cart-icon/cart-icon";
import './navigation.styles'
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import { CartContext } from "../../contexts/cart";
import { pages } from "../../utils/pages/pages";
import { LogoContainer, NavigationContainer, NavLink, NavLinks } from "./navigation.styles";

const Navigation = () => {
	const {currentUser} = useContext(UserContext)
	const {isCartOpen,setIsCartOpen} = useContext(CartContext)


	return (
		<>
			<NavigationContainer>
				<LogoContainer to={'/'} className={'logo-container'}>
					<CrownLogo/>
				</LogoContainer>
				<NavLinks>

					{
						pages.map(({isNavigation,path,title,className}) => isNavigation && (
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
