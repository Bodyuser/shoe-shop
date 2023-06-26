import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'

import Heading from '@/ui/Heading/Heading'

import { iProduct } from '@/shared/types/products/product.types'

import BrandList from './BrandList/BrandList'
import styles from './PopularProducts.module.scss'

interface IPopularProducts {
	products: iProduct[]
}

const PopularProducts: FC<IPopularProducts> = ({ products }) => {
	const [active, setActive] = useState('All')
	const [currentProducts, setCurrentProducts] = useState<iProduct[]>(
		[] as iProduct[]
	)
	useEffect(() => {
		if (active === 'All') {
			setCurrentProducts(products)
		} else {
			setCurrentProducts(
				products.filter(
					(product) => product.brand.toLowerCase() == active.toLowerCase()
				)
			)
		}
	}, [active, products])
	return (
		<div className={styles.popularProducts}>
			<BrandList active={active} setActive={setActive} products={products} />
			<div className={styles.products}>
				<div className={styles.heading}>
					<Heading Tag="h3" title="Popular Products" />
					<Link href="/explore" legacyBehavior>
						<a>See all</a>
					</Link>
				</div>
				<ul>
					{currentProducts &&
						currentProducts.map((product) => (
							<div
								key={product.id}
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
						))}
				</ul>
			</div>
		</div>
	)
}

export default PopularProducts
