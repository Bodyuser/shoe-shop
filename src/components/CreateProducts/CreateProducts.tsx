import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'
import { stripHtml } from 'string-strip-html'

import AuthField from '@/ui/AuthField/AuthField'
import Heading from '@/ui/Heading/Heading'
import Select from '@/ui/Select/Select'
import UploadField from '@/ui/UploadField/UploadField'

import { IInputForProducts } from '@/shared/types/products/input.types'

import { ProductsService } from '@/services/products/products.service'

import { ToastError } from '@/utils/ToastrError'

import { menuOptionsBrandsData } from '../Explore/MenuOptions/menuOptions.data'

import styles from './CreateProducts.module.scss'

const TextEditor = dynamic(() => import('@/ui/TextEditor/TextEditor'), {
	ssr: false,
})

interface IForm {
	title: string
	model: string
	backgroundColor: string
	brand: string
	imagePath: string
	price: number
	description: string
}

const CreateProducts: FC = () => {
	const {
		control,
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<IForm>({
		mode: 'onChange',
	})
	const { data: products } = useQuery('get products', () =>
		ProductsService.GetAll()
	)
	const { mutateAsync } = useMutation(
		'create product',
		(data: IInputForProducts) => ProductsService.CreateProduct(data),
		{
			onError(error) {
				ToastError(error, 'Create Product')
			},
			onSuccess() {
				toastr.success('Create product', 'Create was successful')
			},
		}
	)
	const { replace } = useRouter()
	const onSUbmit: SubmitHandler<IForm> = async (data) => {
		await mutateAsync({
			...data,
			brand: data.brand[0],
			price: Number(data.price),
		})
		await replace('/profile')
	}
	return (
		<div className={styles.create}>
			<Heading Tag="h3" title="Create product" />
			<form onSubmit={handleSubmit(onSUbmit)}>
				<AuthField
					{...register('title', {
						required: 'This field is required',
					})}
					placeholder="Title"
					type="text"
					error={errors.title}
					icon="BsTextIndentLeft"
				/>
				<AuthField
					{...register('model', {
						required: 'This field is required',
					})}
					placeholder="Model"
					type="text"
					error={errors.model}
					icon="BsApp"
				/>
				<AuthField
					{...register('price', {
						required: 'This field is required',
					})}
					placeholder="Price"
					type="number"
					error={errors.price}
					icon="BsAlarm"
				/>
				<AuthField
					{...register('backgroundColor', {
						required: 'This field is required',
					})}
					placeholder="BackgroundColor"
					type="text"
					error={errors.backgroundColor}
					icon="BsPieChart"
				/>
				<AuthField
					{...register('brand', {
						required: 'This field is required',
					})}
					placeholder="Brand"
					type="text"
					error={errors.brand}
					icon="BsTag"
				/>
				{/* <Controller
					name="brand"
					render={({ field, fieldState: { error } }) => (
						<Select
							value={field}
							options={menuOptionsBrandsData(products || [])}
							error={error}
							placeholder="Select brands"
							isMulti
						/>
					)}
					control={control}
				/> */}
				<Controller
					name="imagePath"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<UploadField
							onChange={onChange}
							folder="products"
							placeholder="Image"
							error={error}
							image={value}
						/>
					)}
				/>
				<Controller
					name="description"
					control={control}
					defaultValue=""
					render={({ field: { value, onChange }, fieldState: { error } }) => (
						<TextEditor
							placeholder="Description"
							onChange={onChange}
							error={error}
							value={value}
						/>
					)}
					rules={{
						validate: {
							required: (v) =>
								(v && stripHtml(v).result.length > 0) ||
								'Description is required!',
						},
					}}
				/>
				<button type="submit">Create</button>
			</form>
		</div>
	)
}

export default CreateProducts
