import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
	// Находим карточку
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
	// Возвращаем новый массив и увеличиваем количество на 1
	if (existingCartItem) {
		return cartItems.map((cartItem) => cartItem.id === productToAdd.id
			? {...cartItem, quantity: cartItem.quantity++}
			: cartItem
		)
	}

	return [...cartItems,{...productToAdd, quantity: 1}]

}

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {
	},
	cartItems: [],
	addItemToCart: () => {
	}
})

export const CartProvider = ({children}) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [cartCount,setCartCount] = useState(0)

	useEffect(() => {
		const newCartCount = cartItems.reduce((total,cartItem) => {
			return total + cartItem.quantity
		},0)
		setCartCount(newCartCount)
	},[cartItems])

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd))
	}

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		cartCount
	}

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	)
}
