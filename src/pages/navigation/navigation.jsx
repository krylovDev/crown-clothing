import { Link, Outlet } from 'react-router-dom'

import { ReactComponent as CrownLogo } from '../../assets/crown-logo.svg'
import { useContext } from "react";
import { UserContext } from "../../contexts/user";
import { signOutUser } from "../../utils/database/firebase";
import CartIcon from "../../components/cart-icon/cart-icon";
import './navigation.scss'
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";
import { CartContext } from "../../contexts/cart";

const Navigation = () => {
	const {currentUser} = useContext(UserContext)
	const {isCartOpen,setIsCartOpen} = useContext(CartContext)


	return (
		<>
			<div className={'navigation'}>
				<Link to={'/'} className={'logo-container'}>
					<CrownLogo/>
				</Link>
				<div className={'nav-links-container'}>
					<Link className={'nav-link'} to={'/shop'}>SHOP</Link>
					{
						currentUser
							? <span className={'nav-link'} onClick={signOutUser}> SIGN OUT</span>
							: <Link className={'nav-link'} to={'/auth'}>SIGN IN</Link>
					}
					<CartIcon/>
				</div>

				{isCartOpen && <CartDropdown/>}
			</div>
			<Outlet/> {/* Работает как children */}
		</>
	)
}

export default Navigation
