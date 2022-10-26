import React, { FC, memo, useMemo } from 'react';
import './product-card.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryItem } from '../../store/categories/category.types';
import { addItemToCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selectors';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button';

type ProductCardProps = {
	product: CategoryItem
}

const ProductCard: FC<ProductCardProps> = memo(({ product }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;

  const cartItems = useSelector(selectCartItems);
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to Card
      </Button>
    </div>
  );
});

export default ProductCard;
