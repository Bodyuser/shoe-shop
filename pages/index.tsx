import { GetStaticProps, NextPage } from 'next'
import { useQuery } from 'react-query'

import Home from '@/components/Home/Home'

import { iProduct } from '@/shared/types/products/product.types'

import { ProductsService } from '@/services/products/products.service'

interface IHomePage {
	products: iProduct[]
}

const HomePage: NextPage<IHomePage> = ({ products }) => {
	const { data } = useQuery('get products', () => ProductsService.GetAll(), {
		initialData: products,
	})
	return <Home products={data || []} />
}

export default HomePage

export const getStaticProps: GetStaticProps = async () => {
	const products = await ProductsService.GetAll()
	return {
		props: {
			products,
		},
	}
}
