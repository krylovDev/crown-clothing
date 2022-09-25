import createAction from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

// Увеличиваем количество, добавляем карточку
const addCartItem = (cartItems, productToAdd) => {
	// Находим карточку
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
	// Возвращаем новый массив и увеличиваем количество на 1
	if (existingCartItem) {
		return cartItems.map((cartItem) => cartItem.id === productToAdd.id
			? {...cartItem, quantity: cartItem.quantity + 1}
			: cartItem
		)
	}

	return [...cartItems, {...productToAdd, quantity: 1}]

}

// Уменьшаем количество
const removeCartItem = (cartItems, cartItemToRemove) => {
	// Находим карточку
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
	}

	return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
		? {...cartItem, quantity: cartItem.quantity - 1}
		: cartItem
	)

}

// Удаляем карточку
const deleteCartItem = (cartItems, cartItemToDelete) => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToDelete.id)
}

export const setIsCartOpen = (boolean) =>
	createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)


// Увеличиваем количество
export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd)
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

// Уменьшаем количество
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove)
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

// Удаляем карточку из корзины
export const clearItemFromCart = (cartItems, cartItemToDelete) => {
	const newCartItems = deleteCartItem(cartItems, cartItemToDelete)
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}
