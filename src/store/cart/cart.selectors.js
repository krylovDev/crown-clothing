import { createSelector } from "reselect";

const selectCartReducer = ({cart}) => cart

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
