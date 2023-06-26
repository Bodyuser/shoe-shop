import { FC } from 'react'

import { iProduct } from '@/shared/types/products/product.types'

import styles from './Home.module.scss'
import PopularProducts from './PopularProducts/PopularProducts'

interface IHome {
	products: iProduct[]
}

const Home: FC<IHome> = ({ products }) => {
	return (
		<div className={styles.home}>
			<PopularProducts products={products} />
		</div>
	)
}

export default Home
