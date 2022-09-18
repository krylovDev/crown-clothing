import { createContext, useReducer } from "react";
import createAction from '../utils/reducer/reducer.utils'

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

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {
	},
	cartItems: [],
	addItemToCart: () => {
	},
	removeItemFromCart: () => {
	},
	deleteItemFromCart: () => {
	},
	cartTotalPrice: 0
})

export const CART_ACTION_TYPES = {
	SET_CART_IS_OPEN: 'SET_CART_IS_OPEN',
	SET_CART_ITEMS: 'SET_CART_ITEMS',
	SET_CART_COUNT: 'SET_CART_COUNT',
	SET_CART_TOTAL_PRICE: 'SET_CART_TOTAL_PRICE'
}

const cartReducer = (state, action) => {
	const {type, payload} = action

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_IS_OPEN:
			return {
				...state,
				isCartOpen: payload
			}
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload
			}
		case CART_ACTION_TYPES.SET_CART_COUNT:
			return {
				...state,
				cartCount: payload
			}
		case CART_ACTION_TYPES.SET_CART_TOTAL_PRICE:
			return {
				...state,
				cartTotalPrice: payload
			}
		default:
			throw new Error(`Unhandled type ${type} in cartReducer`)
	}
}

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotalPrice: 0
}

export const CartProvider = ({children}) => {
	const [{
		isCartOpen,
		cartItems,
		cartCount,
		cartTotalPrice
	}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

	const setIsCartOpen = (isCartOpen) => dispatch(
		createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, isCartOpen)
	)

	const setCartItems = (cartItems) => dispatch(
		createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
	)

	const setCartCount = (cartCount) => dispatch(
		createAction(CART_ACTION_TYPES.SET_CART_COUNT, cartCount)
	)

	const setCartTotalPrice = (totalPrice) => dispatch(
		createAction(CART_ACTION_TYPES.SET_CART_TOTAL_PRICE, totalPrice)
	)

	const updateCartItemsReducer = (newCartItems) => {
		const newTotalPrice = newCartItems.reduce((total, {quantity, price}) => {
			return total += quantity * price
		}, 0)

		const newCartCount = newCartItems.reduce((total, cartItem) => {
			return total + cartItem.quantity
		}, 0)

		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
				cartItems: newCartItems,
				cartTotalPrice: newTotalPrice,
				cartCount: newCartCount
			}))
	}

	// Увеличиваем количество
	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd)
		updateCartItemsReducer(newCartItems)
	}

	// Уменьшаем количество
	const removeItemFromCart = (cartItemToRemove) => {
		const newCartItems = removeCartItem(cartItems, cartItemToRemove)
		updateCartItemsReducer(newCartItems)
	}

	// Удаляем карточку из корзины
	const deleteItemFromCart = (cartItemToDelete) => {
		const newCartItems = deleteCartItem(cartItems, cartItemToDelete)
		updateCartItemsReducer(newCartItems)
	}

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItemFromCart,
		deleteItemFromCart,
		cartItems,
		cartCount,
		cartTotalPrice
	}

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	)
}
