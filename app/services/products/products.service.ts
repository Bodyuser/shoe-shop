import { iProduct } from '@/shared/types/products/product.types'

import {
	IInputForProducts,
	IProductOptions,
} from './../../shared/types/products/input.types'
import axios from '@/api/axios'
import { GetProductsUrl } from '@/helpers/api.helper'

export const ProductsService = {
	async CreateProduct(data: IInputForProducts) {
		const response = await axios.post<iProduct>(
			`${GetProductsUrl('/create')}`,
			{
				...data,
			}
		)
		return response.data
	},
	async GetAll(options?: IProductOptions) {
		const response = await axios.post<iProduct[]>(`${GetProductsUrl('')}`, {
			...options,
		})
		return response.data
	},
}
