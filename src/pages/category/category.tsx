import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  CategoryContainer,
  CategoryTitle,
} from './category.styles';
import ProductCard from '../../components/product-card/product-card';
import Spinner from '../../components/spinner/spinner';
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../../store/categories/category.selectors';

type CategoryRouteParams = {
	category: string
}

const Category = memo(() => {
  const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [
    category,
    categoriesMap,
  ]);

  return (
    <>
      <CategoryTitle>
        {category}
      </CategoryTitle>
      {
				isLoading
				  ? <Spinner />
				  : (
  <CategoryContainer>
    {
							products && products.map((product) => <ProductCard key={product.id} product={product} />)
						}
  </CategoryContainer>
				  )
			}
    </>
  );
});

export default Category;
