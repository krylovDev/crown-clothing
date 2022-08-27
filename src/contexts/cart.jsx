import { createContext, useEffect, useState } from "react";

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

	return [...cartItems,{...productToAdd, quantity: 1}]

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
const deleteCartItem = (cartItems,cartItemToDelete) => {
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

export const CartProvider = ({children}) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [cartCount,setCartCount] = useState(0)
	const [cartTotalPrice,setCartTotalPrice] = useState(0)

	// Цена всех товаров в корзине
	useEffect(() => {
		const newTotalPrice = cartItems.reduce((total, {quantity,price}) => {
			return total += quantity * price
		},0)
		setCartTotalPrice(newTotalPrice)
	},[cartItems])

	// Изменяем количество товара
	useEffect(() => {
		const newCartCount = cartItems.reduce((total,cartItem) => {
			return total + cartItem.quantity
		},0)
		setCartCount(newCartCount)
	},[cartItems])

	// Увеличиваем количество
	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd))
	}

	// Уменьшаем количество
	const removeItemFromCart = (cartItemToRemove) => {
		setCartItems(removeCartItem(cartItems, cartItemToRemove))
	}

	// Удаляем карточку из корзины
	const deleteItemFromCart = (cartItemToDelete) => {
		setCartItems(deleteCartItem(cartItems, cartItemToDelete))
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
