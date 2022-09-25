import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.actions";
import { selectCartItems, selectIsCartOpened } from "../../store/cart/cart.selectors";
import {
	CartIconContainer,
	ItemCount,
	ShoppingIcon
} from "./CartIcon.styles";

const CartIcon = () => {
	const dispatch = useDispatch()

	const isCartOpen = useSelector(selectIsCartOpened)
	const cartItems = useSelector(selectCartItems)

	const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

	return (
		<CartIconContainer
			onClick={toggleIsCartOpen}
		>
			<ShoppingIcon/>
			<ItemCount>
				{cartItems.length}
			</ItemCount>
		</CartIconContainer>
	)
}


export default CartIcon
