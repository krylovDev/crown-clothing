import {CategoryItem} from '../../store/categories/category.types'
import {
	createAction
} from "../../utils/reducer/reducer.utils";
import {withMatcher} from '../../utils/reducer/reducer.utils.types'
import {CART_ACTION_TYPES, CartItem, SetCartItems, SetIsCartOpen} from "./cart.types";


// Увеличиваем количество, добавляем карточку
const addCartItem = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
): CartItem[] => {
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
const removeCartItem = (
	cartItems: CartItem[],
	cartItemToRemove: CartItem
) => {
	// Находим карточку
	const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

	if (existingCartItem && existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
	}

	return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
		? {...cartItem, quantity: cartItem.quantity - 1}
		: cartItem
	)

}

// Удаляем карточку
const deleteCartItem = (
	cartItems: CartItem[],
	cartItemToDelete: CartItem
): CartItem[] => {
	return cartItems.filter(
		(cartItem) => cartItem.id !== cartItemToDelete.id
	)
}



export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen =>
	createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean))


export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems =>
	createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))

// Увеличиваем количество
export const addItemToCart = (
	cartItems: CartItem[],
	productToAdd: CartItem
) => {
	const newCartItems = addCartItem(cartItems, productToAdd)
	return setCartItems(newCartItems)
}

// Уменьшаем количество
export const removeItemFromCart = (
	cartItems: CartItem[],
	cartItemToRemove: CartItem
) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove)
	return setCartItems(newCartItems)
}

// Удаляем карточку из корзины
export const clearItemFromCart = (
	cartItems: CartItem[],
	cartItemToDelete: CartItem
) => {
	const newCartItems = deleteCartItem(cartItems, cartItemToDelete)
	return setCartItems(newCartItems)
}
