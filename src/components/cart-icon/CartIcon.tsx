import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.actions';
import { selectCartItems, selectIsCartOpened } from '../../store/cart/cart.selectors';
import {
  CartIconContainer,
  ItemCount,
} from './CartIcon.styles';
import { ReactComponent as ShoppingSvg } from '../../assets/shopping-bag.svg';

const CartIcon = memo(() => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpened);
  const cartItems = useSelector(selectCartItems);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer
      onClick={toggleIsCartOpen}
    >
      <ShoppingSvg />
      <ItemCount>
        {cartItems.length}
      </ItemCount>
    </CartIconContainer>
  );
});

export default CartIcon;
