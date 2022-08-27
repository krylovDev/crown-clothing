import Shop from '../../pages/shop/shop'
import Checkout from '../../pages/checkout/checkout'

export const pages = [
	{
		isNavigation: true,
		path: '/shop',
		title: 'SHOP',
		component: <Shop/>,
		className: 'nav-link'
	},
	{
		isNavigation: false,
		path: '/checkout',
		title: 'Test',
		component: <Checkout/>
	},
]
