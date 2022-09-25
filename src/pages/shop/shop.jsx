import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setCategories } from "../../store/categories/category.actions";
import { getCategoriesAndDocuments } from "../../utils/database/firebase";
import CategoriesPreview from "../categories-preview/categories-preview";
import Category from "../category/category";
import './shop.scss'

const Shop = () => {
	const dispatch = useDispatch()

	// getCategories
	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesArray = await getCategoriesAndDocuments('categories')
			dispatch(setCategories(categoriesArray))
		}
		getCategoriesMap()
	}, [])

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path={':category'} element={<Category />} />
		</Routes>
	)
}

export default Shop
