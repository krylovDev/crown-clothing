import {ActionWithPayload} from '../../utils/reducer/reducer.utils.types'
import {CategoryItem} from '../categories/category.types'

export enum CART_ACTION_TYPES {
	SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
	SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
	SET_CART_COUNT = 'cart/SET_CART_COUNT',
	SET_CART_TOTAL_PRICE = 'cart/SET_CART_TOTAL_PRICE'
}

// __________ DATA STRUCTURE  __________
export interface CartItem extends CategoryItem {
	quantity: number
}

export interface CartState {
	readonly isCartOpen: boolean
	readonly cartItems: CartItem[]
}

// __________ ACTIONS  __________
export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>
