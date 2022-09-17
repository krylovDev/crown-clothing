import React from 'react'
import Directory from '../../components/directory/directory'
import { Outlet } from 'react-router-dom'
import SHOP_DATA from "../../shop-data";

const Home = () => {


	return (
		<>
			<Directory/>
			<Outlet/>
		</>
	)
}

export default Home
