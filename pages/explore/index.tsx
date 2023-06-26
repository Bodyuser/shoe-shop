import { GetStaticProps, NextPage } from 'next'
import { useQuery } from 'react-query'

import Explore from '@/components/Explore/Explore'

import { iProduct } from '@/shared/types/products/product.types'

import { ProductsService } from '@/services/products/products.service'

interface IExplorePage {
	products: iProduct[]
}

const ExplorePage: NextPage<IExplorePage> = ({ products }) => {
	const { data } = useQuery(
		'get products for explore',
		() => ProductsService.GetAll(),
		{
			initialData: products,
		}
	)
	return <Explore products={data || []} />
}

export default ExplorePage

export const getStaticProps: GetStaticProps = async () => {
	const products = await ProductsService.GetAll()
	return {
		props: {
			products,
		},
	}
}
