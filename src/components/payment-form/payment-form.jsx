import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { selectCartTotalPrice } from "../../store/cart/cart.selectors";
import { selectCurrentUser } from "../../store/user/user.selectors";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button";
import { FormContainer, PaymentButton, PaymentFormContainer } from "./payment-form.styles";

const PaymentForm = () => {
	const stripe = useStripe()
	const elements = useElements()
	const amount = useSelector(selectCartTotalPrice)
	const currentUser = useSelector(selectCurrentUser)
	const [isProcessingPayment, setIsProcessingPayment] = useState(false)

	const paymentHandler = async (event) => {
		event.preventDefault()

		if (!stripe || !elements) return

		setIsProcessingPayment(true)

		const response = await fetch('/.netlify/functions/createPaymentIntent', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({amount: amount * 100})
		})
			.then((res) => res.json())

		const clientSecret = response.paymentIntent.client_secret

		const paymentResult = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser
						? currentUser.displayName
						: 'Guest',
				}
			}
		})

		setIsProcessingPayment(false)

		if (paymentResult.error) {
			alert(paymentResult.error)
		} else {
			if (paymentResult.paymentIntent.status === 'succeeded') {
				alert('Payment successful')
			}
		}

	}

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit card payment</h2>
				<CardElement/>
				<PaymentButton
					buttonType={BUTTON_TYPE_CLASSES.inverted}
					isLoading={isProcessingPayment}
				>
					Pay now
				</PaymentButton>
			</FormContainer>
		</PaymentFormContainer>
	)
}

export default PaymentForm
