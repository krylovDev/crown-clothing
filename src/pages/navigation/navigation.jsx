import { Link, Outlet } from 'react-router-dom'

import { ReactComponent as CrownLogo } from '../../assets/crown-logo.svg'

import './navigation.scss'
import { pages } from '../../utils/pages/pages'

const Navigation = () => {
	return (
		<>
			<div className={ 'navigation' }>
				<Link to={ '/' } className={ 'logo-container' }>
					<CrownLogo/>
				</Link>
				<div className={ 'nav-links-container' }>
					{ pages.map(({ path, title }) => (
						<Link key={path} to={ path } className={ 'nav-link' }>
							{ title }
						</Link>
					)) }
				</div>
			</div>
			<Outlet/> {/* Работает как children */ }
		</>
	)
}

export default Navigation
