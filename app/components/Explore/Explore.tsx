import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

import { IProductOptions } from '@/shared/types/products/input.types'
import { iProduct } from '@/shared/types/products/product.types'

import { ProductsService } from '@/services/products/products.service'

import styles from './Explore.module.scss'
import MenuOptions, { IExploreForm } from './MenuOptions/MenuOptions'
import ProductList from './ProductList/ProductList'

interface IExplore {
	products: iProduct[]
}

const Explore: FC<IExplore> = ({ products }) => {
	const {
		control,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IExploreForm>({
		mode: 'onChange',
		defaultValues: { created: 'old', price: { min: 0 } },
	})
	const [error, setError] = useState('')
	const { mutateAsync, data, isLoading } = useMutation(
		'get products with options',
		(options: IProductOptions) => ProductsService.GetAll(options)
	)
	const onSubmit: SubmitHandler<IExploreForm> = async (data) => {
		if (!data.brand?.length) {
			delete data.brand
		}
		if (data.price?.max && data.price?.min) {
			if (data.price?.max < data.price?.min) {
				setError('Max price less than min price')
			}
		}
		await mutateAsync({
			...data,
			price: {
				max: Number(data.price?.max),
				min: Number(data.price?.min),
			},
		})
	}
	return (
		<div>
			<MenuOptions
				products={products}
				control={control}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				register={register}
				errors={errors}
			/>
			{error && <p className={styles.error}>{error}</p>}
			<ProductList isLoading={isLoading} products={data || products} />
		</div>
	)
}

export default Explore
