import { createSelector } from "reselect";
import {RootState} from '../types/store.types'
import {CartState} from './cart.types'

const selectCartReducer = (state: RootState): CartState => state.cart

export const selectCartItems = createSelector(
	[selectCartReducer],
	({cartItems}) => cartItems
)

export const selectIsCartOpened = createSelector(
	[selectCartReducer],
	({isCartOpen}) => isCartOpen
)

export const selectCartTotalPrice = createSelector(
	[selectCartItems],
	(cartItems) => cartItems.reduce((total, {quantity, price}) => {
		return total += quantity * price
	}, 0)
)

export const selectCartCount = createSelector(
	[selectCartItems],
	(cartItems) => cartItems.reduce((total, cartItem) => {
		return total + cartItem.quantity
	}, 0)
)
