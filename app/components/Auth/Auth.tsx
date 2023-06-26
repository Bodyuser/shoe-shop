import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import AuthField from '@/ui/AuthField/AuthField'
import Heading from '@/ui/Heading/Heading'

import { useActions } from '@/hooks/useActions'

import styles from './Auth.module.scss'

export interface IAuthFields {
	email: string
	name: string
	password: string
}

const Auth: FC = () => {
	const [type, setType] = useState<'signup' | 'signin'>('signup')
	const { SignIn, SignUp } = useActions()
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm<IAuthFields>({
		mode: 'onChange',
	})
	const onSubmit: SubmitHandler<IAuthFields> = async (data) => {
		try {
			if (type === 'signin') {
				const { name, ...rest } = data
				const response = await SignIn({ ...rest })
				if (!response) {
					return
				}
			} else {
				const response = await SignUp({ ...data })
				if (!response) {
					return
				}
			}
			reset()
		} catch (error) {
			console.log('Error')
		}
	}
	return (
		<div className={styles.auth}>
			<Heading Tag="h3" title={type === 'signin' ? 'Sign In' : 'Sign Up'} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<AuthField
					error={errors.email}
					placeholder="Email"
					type="email"
					{...register('email', {
						required: 'This field is required',
						pattern: {
							value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
							message: 'This field must be email pattern',
						},
					})}
					icon="BsEnvelope"
				/>
				{type === 'signup' && (
					<AuthField
						error={errors.name}
						placeholder="Name"
						type="text"
						icon="BsPerson"
						{...register('name', {
							required: 'This field is required',
						})}
					/>
				)}
				<AuthField
					error={errors.password}
					placeholder="Password"
					type="password"
					icon="BsKey"
					{...register('password', {
						required: 'This field is required',
						minLength: {
							value: 8,
							message: 'This field must be at min 8 characters',
						},
					})}
				/>
				<button type="submit">
					{type === 'signin' ? 'Sign In' : 'Sign Up'}
				</button>
			</form>
			<button
				type="button"
				className={styles.change}
				onClick={() =>
					setType((prev) => (prev === 'signin' ? 'signup' : 'signin'))
				}
			>
				Go to {type === 'signin' ? 'Sign Up' : 'Sign In'}
			</button>
		</div>
	)
}

export default Auth
