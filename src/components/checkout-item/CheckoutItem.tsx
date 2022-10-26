import React, { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICartItem } from '../../store/cart/cart.types';
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selectors';
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './CheckoutItem.styles';

type CheckoutItemProps = {
	cartItem: ICartItem
}

const CheckoutItem: FC<CheckoutItemProps> = memo(({ cartItem }) => {
  const {
    imageUrl,
    name,
    price,
    quantity,
  } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
  const deleteItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow
          onClick={removeItemHandler}
        >
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow
          onClick={addItemHandler}
        >
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton
        onClick={deleteItemHandler}
      >
        &#10005;
        {' '}
        {/* X */}
      </RemoveButton>
    </CheckoutItemContainer>
  );
});

export default CheckoutItem;
