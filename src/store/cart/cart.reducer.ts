import {AnyAction} from 'redux'
import {
	setCartItems,
	setIsCartOpen
} from './cart.actions'
import {CART_ACTION_TYPES, CartState} from "./cart.types";

export const CART_INITIAL_STATE: CartState = {
	isCartOpen: false,
	cartItems: [],
}

export const cartReducer = (
	state = CART_INITIAL_STATE,
	action: AnyAction
): CartState => {
	if (setIsCartOpen.match(action)) {
		return {
			...state,
			isCartOpen: action.payload
		}
	}

	if (setCartItems.match(action)) {
		return {
			...state,
			cartItems: action.payload
		}
	}

	return state


/*
	switch (type) {
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload
			}
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				cartItems: payload
			}
		case CART_ACTION_TYPES.SET_CART_COUNT:
			return {
				...state,
				cartCount: payload
			}
		case CART_ACTION_TYPES.SET_CART_TOTAL_PRICE:
			return {
				...state,
				cartTotalPrice: payload
			}
		default:
			return state
	}
*/
}
