import cn from 'classnames'
import { Dispatch, FC } from 'react'

import { iProduct } from '@/shared/types/products/product.types'

import { ChangeFirstLetter } from '@/utils/ChangeFirstLetter'

import styles from './BrandList.module.scss'

interface IBrandList {
	products: iProduct[]
	active: string
	setActive: Dispatch<string>
}

const BrandList: FC<IBrandList> = ({ products, active, setActive }) => {
	const brands = [
		'All',
		...products.map((product) => ChangeFirstLetter(product.brand)),
	]
	const brandList = brands.filter((brand, index) => {
		return brands.indexOf(brand) === index
	})

	return (
		<ul className={styles.brand}>
			{brandList.map((brand) => (
				<li
					onClick={() => setActive(brand)}
					className={cn({
						[styles.active]: brand == active,
					})}
					key={brand}
				>
					{brand}
				</li>
			))}
		</ul>
	)
}

export default BrandList
