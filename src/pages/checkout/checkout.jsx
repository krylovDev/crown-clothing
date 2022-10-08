import React from 'react';
import { useSelector } from "react-redux";
import './checkout.scss'
import CheckoutItem from "../../components/checkout-item/checkout-item";
import PaymentForm from "../../components/payment-form/payment-form";
import { selectCartItems, selectCartTotalPrice } from "../../store/cart/cart.selectors";

const Checkout = () => {
	const cartItems = useSelector(selectCartItems)
	const cartTotalPrice = useSelector(selectCartTotalPrice)

	return (
		<>
			<div className={'checkout-container'}>
				<div className={'checkout-header'}>
					<div className={'header-block'}>
						<span>Product</span>
					</div>
					<div className={'header-block'}>
						<span>Description</span>
					</div>
					<div className={'header-block'}>
						<span>Quantity</span>
					</div>
					<div className={'header-block'}>
						<span>Price</span>
					</div>
					<div className={'header-block'}>
						<span>Remove</span>
					</div>
				</div>
				{
					cartItems.map((cartItem) => (
						<CheckoutItem
							key={cartItem.id}
							cartItem={cartItem}
						/>
					))
				}
				<span className={'total'}>Total: &#36; {`${cartTotalPrice}`}</span>
				<PaymentForm/>
			</div>
		</>
	);
};

export default Checkout;
