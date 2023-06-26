import Image from 'next/image'
import { FC } from 'react'

import { iProduct } from '@/shared/types/products/product.types'

import styles from './ProductItem.module.scss'

interface IProductItem {
	product: iProduct
}

const ProductItem: FC<IProductItem> = ({ product }) => {
	return (
		<div
			className={styles.product}
			style={{ backgroundColor: product.backgroundColor }}
		>
			<div className={styles.info}>
				<span className={styles.title}>{product.title}</span>
				<span className={styles.model}>
					Model Number - <span>{product.model}</span>
				</span>
				<span className={styles.price}>${product.price}</span>
			</div>
			<div className={styles.image}>
				<Image
					src={`${product.imagePath}`}
					alt={product.title}
					width={150}
					height={70}
				/>
			</div>
		</div>
	)
}

export default ProductItem
