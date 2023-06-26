import { FC } from 'react'

import { iProduct } from '@/shared/types/products/product.types'

import ProductItem from './ProductItem/ProductItem'
import styles from './ProductList.module.scss'

interface IProductList {
	products: iProduct[]
	isLoading: boolean
}

const ProductList: FC<IProductList> = ({ products, isLoading }) => {
	return (
		<div className={styles.list}>
			{isLoading ? (
				<div className={styles.loading}>Loading...</div>
			) : products.length ? (
				products.map((product) => (
					<ProductItem key={product.id} product={product} />
				))
			) : (
				<div>Not found</div>
			)}
		</div>
	)
}

export default ProductList
