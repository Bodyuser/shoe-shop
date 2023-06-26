import { iProduct } from '@/shared/types/products/product.types'

import { ChangeFirstLetter } from '@/utils/ChangeFirstLetter'

import { IOption } from './../../../ui/Select/Select'

export const menuOptionsCreatedData: IOption[] = [
	{
		value: 'old',
		label: 'Old',
	},
	{
		value: 'new',
		label: 'New',
	},
]

export const menuOptionsBrandsData = (products: iProduct[]): IOption[] => {
	const brands = [
		...products.map((product) => ChangeFirstLetter(product.brand)),
	]
	const brandList = brands.filter((brand, index) => {
		return brands.indexOf(brand) === index
	})
	return brandList.map((brand) => ({
		value: brand.toLowerCase(),
		label: brand,
	}))
}
