import dynamic from 'next/dynamic'
import { Dispatch, FC } from 'react'
import {
	Control,
	Controller,
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormRegister,
	useForm,
} from 'react-hook-form'

import AuthField from '@/ui/AuthField/AuthField'
import Heading from '@/ui/Heading/Heading'

import { iProduct } from '@/shared/types/products/product.types'

import styles from './MenuOptions.module.scss'
import {
	menuOptionsBrandsData,
	menuOptionsCreatedData,
} from './menuOptions.data'

const Select = dynamic(() => import('@/ui/Select/Select'), {
	ssr: false,
})

export interface IExploreForm {
	brand?: string[]
	created: 'old' | 'new'
	price?: {
		min: number
		max: number
	}
}

interface IMenuOptions {
	products: iProduct[]
	control: Control<IExploreForm, any>
	handleSubmit: UseFormHandleSubmit<IExploreForm>
	onSubmit: SubmitHandler<IExploreForm>
	errors?: any
	register: UseFormRegister<IExploreForm>
}

const MenuOptions: FC<IMenuOptions> = ({
	products,
	control,
	handleSubmit,
	onSubmit,
	register,
	errors,
}) => {
	return (
		<form className={styles.menu} onSubmit={handleSubmit(onSubmit)}>
			<Heading Tag="h2" title="Explore" style={{ textAlign: 'center' }} />
			<Controller
				name="created"
				render={({ field, fieldState: { error } }) => (
					<Select
						value={field}
						options={menuOptionsCreatedData}
						error={error}
						placeholder="Select date created"
					/>
				)}
				control={control}
			/>
			<Controller
				name="brand"
				render={({ field, fieldState: { error } }) => (
					<Select
						value={field}
						options={menuOptionsBrandsData(products)}
						error={error}
						placeholder="Select brands"
						isMulti
					/>
				)}
				control={control}
			/>
			<div className={styles.price}>
				<AuthField
					{...register('price.min')}
					placeholder="Min price"
					type="number"
					error={errors.price?.min}
					icon="BsCash"
				/>
				<AuthField
					{...register('price.max')}
					placeholder="Max price"
					type="number"
					error={errors.price?.max}
					icon="BsCashStack"
				/>
			</div>
			<button type="submit">Применить</button>
		</form>
	)
}

export default MenuOptions
