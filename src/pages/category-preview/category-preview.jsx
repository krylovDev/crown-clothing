import React, { memo, useMemo } from 'react'

import './category-preview.scss'
import ProductCard from "../../components/product-card/product-card";
import { Link } from "react-router-dom";

const CategoryPreview = memo(({title, products}) => {

	const previewCards = useMemo(() => products
		.filter((_, index) => index < 4) // Показываем первые 4 карточки
		.map((product) => (
			<ProductCard
				key={product.id}
				product={product}
			/>
		)),[products])

	return (
		<div className={'category-preview-container'}>
			<h2>
				<Link to={`${title}`} className={'title'}>{title.toUpperCase()}</Link>
			</h2>
			<div className={'preview'}>
				{previewCards}
			</div>
		</div>
	)
})

export default CategoryPreview
