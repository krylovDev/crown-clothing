import React from 'react'
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/spinner";
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selectors";
import CategoryPreview from "../category-preview/category-preview";

const CategoriesPreview = () => {
	const categories = useSelector(selectCategoriesMap)
	const isLoading = useSelector(selectCategoriesIsLoading)

	return (
		<>
			{
				isLoading
					? <Spinner/>
					: Object.keys(categories).map((title) => {
						const products = categories[title]
						return (
							<CategoryPreview
								key={title}
								title={title}
								products={products}
							/>
						)
					})
			}
		</>
	)
}

export default CategoriesPreview
