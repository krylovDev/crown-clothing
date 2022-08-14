import Shop from '../../pages/shop/shop'
import Authentication from '../../pages/authentication/authentication'
import SignUp from '../../pages/sign-up/sign-up'
import SignIn from "../../pages/sign-in/sign-in";

export const pages = [
	{
		path: '/shop',
		title: 'SHOP',
		component: <Shop/>
	},
	{
		path: '/auth',
		title: 'SIGN IN',
		component: <Authentication/>
	},
]
