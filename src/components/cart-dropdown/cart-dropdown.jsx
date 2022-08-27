import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "../button/button";
import { CartContext } from "../../contexts/cart";
import CartItem from "../cart-item/cart-item";
import './cart-dropdown.scss'

const CartDropdown = () => {
	const {cartItems} = useContext(CartContext)
	const navigate = useNavigate()

	const goToCheckoutHandler = () => {
		navigate('/checkout')
	}

	return (
		<div className={'cart-dropdown-container'}>
			<div className={'cart-items'} >
				{
					cartItems.map((cartItem) => (
						<CartItem
							key={cartItem.id}
							cartItem={cartItem}
						/>
					))
				}
			</div>
			<Button onClick={goToCheckoutHandler}>
				CHECKOUT
			</Button>
		</div>
	)
}

export default CartDropdown
