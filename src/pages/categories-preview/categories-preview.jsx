import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../../components/spinner/spinner';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selectors';
import CategoryPreview from '../category-preview/category-preview';

function CategoriesPreview() {
	const categories = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);

	const categoriesPreviewCards = useMemo(() => Object.keys(categories).map((title) => {
		const products = categories[title];

		return (
			<CategoryPreview
				key={title}
				title={title}
				products={products}
			/>
		);
	}), [categories]);

	return (
			isLoading
      ? <Spinner/>
      : categoriesPreviewCards
	);
}

export default CategoriesPreview;
