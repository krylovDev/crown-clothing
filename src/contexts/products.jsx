import React, { createContext, useEffect, useState } from 'react'
import SHOP_DATA from '../shop-data.json'

export const ProductsContext = createContext({
	products: []
})

export const ProductsProvider = ({children}) => {
	const [products, setProducts] = useState([])
	const value = {products}

	useEffect(() => {
		setProducts(SHOP_DATA)
	}, [])

	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	)
}

export default ProductsProvider
