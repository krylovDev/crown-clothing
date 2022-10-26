import React, { FC, memo } from 'react';
import { ICartItem } from '../../store/cart/cart.types';
import {
  CartItemContainer,
  CartItemDetails,
  CartItemName,
  CartItemPrice,
} from './CartItem.styles';

type CartItemProps = {
	cartItem: ICartItem
}

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const {
    name,
    imageUrl,
    price,
    quantity,
  } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <CartItemDetails>
        <CartItemName>{name}</CartItemName>
        <CartItemPrice>
          {quantity}
          {' '}
          x $
          {price}
        </CartItemPrice>
      </CartItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;
