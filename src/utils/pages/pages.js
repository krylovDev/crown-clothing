import Shop from '../../pages/shop/shop'
import SignIn from '../../pages/sign-in/sign-in'
import SignUp from '../../pages/sign-up/sign-up'

export const pages = [
	{
		path: '/shop',
		title: 'SHOP',
		component: <Shop/>
	},
	{
		path: '/sign-in',
		title: 'SIGN IN',
		component: <SignIn/>
	},
	{
		path: '/sign-up',
		title: 'SIGN UP',
		component: <SignUp/>
	},
]
