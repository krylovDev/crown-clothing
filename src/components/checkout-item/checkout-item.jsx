import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import './checkout-item.scss'
import { addItemToCart, clearItemFromCart, removeItemFromCart } from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selectors";

const CheckoutItem = ({cartItem}) => {
	const {id, imageUrl, name, price, quantity} = cartItem
	const dispatch = useDispatch()

	const cartItems = useSelector(selectCartItems)

	const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem))
	const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem))
	const deleteItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem))

	return (
		<div
			key={id}
			className={'checkout-item-container'}
		>
			<div className="image-container">
				<img src={imageUrl} alt={`${name}`}/>
			</div>
			<span className={'name'}>{name}</span>
			<span className={'quantity'}>
				<div
					className={'arrow'}
					onClick={removeItemHandler}
				>
					&#10094;
				</div>
				<span className={'value'}>{quantity}</span>
				<div
					className={'arrow'}
					onClick={addItemHandler}
				>
					&#10095;
				</div>
			</span>
			<span className={'price'}>{price}</span>
			<div
				className="remove-button"
				onClick={deleteItemHandler}
			>
				&#10005; {/* X */}
			</div>
		</div>
	)
}

export default CheckoutItem
