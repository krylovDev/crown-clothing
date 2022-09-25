import React from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { selectCartItems } from "../../store/cart/cart.selectors";
import Button from "../button/button";
import CartItem from "../cart-item/cart-item";
// import './cart-dropdown.scss'
import {
	CartDropdownContainer,
	CartItems,
	EmptyMessage
} from "./CartDropdown.styles";

const CartDropdown = () => {
	const cartItems = useSelector(selectCartItems)
	const navigate = useNavigate()

	const goToCheckoutHandler = () => {
		navigate('/checkout')
	}

	return (
		<CartDropdownContainer>
			<CartItems>
				{
					cartItems.length
						? cartItems.map((cartItem) => (
							<CartItem
								key={cartItem.id}
								cartItem={cartItem}
							/>
						))
						: <EmptyMessage>Your cart is empty</EmptyMessage>
				}
			</CartItems>
			<Button onClick={goToCheckoutHandler}>
				CHECKOUT
			</Button>
		</CartDropdownContainer>
	)
}

export default CartDropdown
