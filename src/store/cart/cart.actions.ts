import { CategoryItem } from '../../store/categories/category.types';
import {
  createAction,
} from '../../utils/reducer/reducer.utils';
import { withMatcher } from '../../utils/reducer/reducer.utils.types';
import {
  CART_ACTION_TYPES, ICartItem, SetCartItems, SetIsCartOpen,
} from './cart.types';

// Увеличиваем количество, добавляем карточку
const addCartItem = (
  cartItems: ICartItem[],
  productToAdd: CategoryItem,
): ICartItem[] => {
  // Находим карточку
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
  // Возвращаем новый массив и увеличиваем количество на 1
  if (existingCartItem) {
    return cartItems.map((cartItem) => (cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem));
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// Уменьшаем количество
const removeCartItem = (
  cartItems: ICartItem[],
  cartItemToRemove: ICartItem,
) => {
  // Находим карточку
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) => (cartItem.id === cartItemToRemove.id
    ? { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem));
};

// Удаляем карточку
const deleteCartItem = (
  cartItems: ICartItem[],
  cartItemToDelete: ICartItem,
): ICartItem[] => cartItems.filter(
  (cartItem) => cartItem.id !== cartItemToDelete.id,
);

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems = withMatcher((cartItems: ICartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

// Увеличиваем количество
export const addItemToCart = (
  cartItems: ICartItem[],
  productToAdd: CategoryItem,
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

// Уменьшаем количество
export const removeItemFromCart = (
  cartItems: ICartItem[],
  cartItemToRemove: ICartItem,
) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

// Удаляем карточку из корзины
export const clearItemFromCart = (
  cartItems: ICartItem[],
  cartItemToDelete: ICartItem,
) => {
  const newCartItems = deleteCartItem(cartItems, cartItemToDelete);
  return setCartItems(newCartItems);
};
