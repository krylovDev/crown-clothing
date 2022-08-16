import { Link, Outlet } from 'react-router-dom'

import { ReactComponent as CrownLogo } from '../../assets/crown-logo.svg'

import './navigation.scss'
import { UserContext } from "../../contexts/user";
import { useContext } from "react";
import { signOutUser } from "../../utils/database/firebase";

const Navigation = () => {
	const { currentUser} = useContext(UserContext)

	return (
		<>
			<div className={ 'navigation' }>
				<Link to={ '/' } className={ 'logo-container' }>
					<CrownLogo/>
				</Link>
				<div className={ 'nav-links-container' }>
					<Link className={ 'nav-link' } to={ '/shop' }>SHOP</Link>
					{
						currentUser
							? <span className={ 'nav-link' } onClick={ signOutUser }> SIGN OUT</span>
							: <Link className={ 'nav-link' } to={ '/auth' }>SIGN IN</Link>
					}
				</div>
			</div>
			<Outlet/> {/* Работает как children */ }
		</>
	)
}

export default Navigation
