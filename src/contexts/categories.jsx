import React, { createContext, useEffect, useState } from 'react'
import SHOP_DATA from '../shop-data.js'
import { getCategoriesAndDocuments } from "../utils/database/firebase";

export const CategoriesContext = createContext({
	categoriesMap: {}
})

export const CategoriesProvider = ({children}) => {
	const [categoriesMap, setCategoriesMap] = useState({})

	useEffect(() => {
		const getCategories = async () => {
			const categoryMap = await getCategoriesAndDocuments()
			console.log(categoryMap)
			setCategoriesMap(categoryMap)
		}
		getCategories()
	}, [])

	const value = {categoriesMap}

	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	)
}

export default CategoriesProvider
