import Shop from '../../pages/shop/shop'
import Authentication from '../../pages/authentication/authentication'
import { ProductsProvider } from "../../contexts/products";

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
