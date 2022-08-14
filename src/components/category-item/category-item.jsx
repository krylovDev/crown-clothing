import './category-item.scss'

const CategoryItem = ({ category }) => {
	const {imageUrl, id, title} = category

	return (
		<div
			key={ id }
			className="category-container"
		>
			<div
				className="background-image"
				style={ { backgroundImage: `url(${ imageUrl })` } }
			/>
			<div className="category-body-container">
				<h2>{ title }</h2>
				<p>shop now</p>
			</div>
		</div>
	)
}

export default CategoryItem
