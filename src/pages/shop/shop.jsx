import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchCategoriesAsync} from "../../store/categories/category.actions";
import CategoriesPreview from "../categories-preview/categories-preview";
import Category from "../category/category";
import './shop.scss'

const Shop = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCategoriesAsync())
	}, [])

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path={':category'} element={<Category />} />
		</Routes>
	)
}

export default Shop
