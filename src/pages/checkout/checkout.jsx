import React, { memo, useMemo } from 'react';
import { useSelector } from "react-redux";
import './checkout.scss'
import CheckoutItem from "../../components/checkout-item/CheckoutItem";
import PaymentForm from "../../components/payment-form/paymentForm";
import { selectCartItems, selectCartTotalPrice } from "../../store/cart/cart.selectors";

const Checkout = memo(() => {
	const cartItems = useSelector(selectCartItems)
	const cartTotalPrice = useSelector(selectCartTotalPrice)

	const cardItemsArray = useMemo(() => cartItems.map((cartItem) => (
		<CheckoutItem
			key={cartItem.id}
			cartItem={cartItem}
		/>
	)),[cartItems])

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
				{cardItemsArray}
				<span className={'total'}>Total: &#36; {`${cartTotalPrice}`}</span>
				<PaymentForm/>
			</div>
		</>
	);
});

export default Checkout;
