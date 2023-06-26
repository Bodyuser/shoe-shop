import { FC, useState } from 'react'
import { Controller } from 'react-hook-form'

import Accordion from '@/ui/Accordion/Accordion'
import AuthField from '@/ui/AuthField/AuthField'
import UploadField from '@/ui/UploadField/UploadField'

import { useAuth } from '@/hooks/useAuth'

import { useEditProfile } from '../hook/useEditProfile'

import styles from './EditForm.module.scss'

const EditForm: FC = () => {
	const {
		handleSubmit,
		onSubmit,
		errors,
		register,
		isEditEmail,
		control,
		dataSlug,
	} = useEditProfile()
	const [isEditPassword, setIsEditPassword] = useState(false)
	const [isEditUsername, setIsEditUsername] = useState(false)
	const [isEditAvatar, setIsEditAvatar] = useState(false)
	const { user } = useAuth()
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<AuthField
				placeholder="Email"
				type="email"
				error={errors.email}
				{...register('email', {
					required: 'This field is required',
					pattern: {
						value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
						message: 'This field must be email pattern',
					},
				})}
				icon="BsEnvelope"
			/>
			{isEditEmail && (
				<AuthField
					placeholder="Code"
					type="number"
					error={errors.code}
					{...register('code', {
						required: {
							value: isEditEmail,
							message: 'This field is required',
						},
					})}
					icon="BsCode"
				/>
			)}
			<AuthField
				error={errors.name}
				placeholder="Name"
				type="text"
				icon="BsPerson"
				{...register('name', {
					required: 'This field is required',
				})}
			/>
			<Accordion
				isOpen={isEditPassword}
				title="Change password"
				setIsOpen={setIsEditPassword}
			>
				<AuthField
					error={errors.currentPassword}
					placeholder="Current password"
					type="password"
					icon="BsKeyFill"
					{...register('currentPassword', {
						required: {
							value: isEditPassword,
							message: 'This field is required',
						},
						minLength: isEditPassword
							? {
									value: 8,
									message: 'This field must be at min 8 characters',
							  }
							: 0,
					})}
				/>
				<AuthField
					error={errors.password}
					placeholder="Password"
					type="password"
					icon="BsKey"
					{...register('password', {
						required: {
							value: isEditPassword,
							message: 'This field is required',
						},
						minLength: isEditPassword
							? {
									value: 8,
									message: 'This field must be at min 8 characters',
							  }
							: 0,
					})}
				/>
			</Accordion>
			<Accordion
				title="Change username"
				isOpen={isEditUsername}
				setIsOpen={setIsEditUsername}
			>
				<AuthField
					error={errors.username}
					placeholder="Username"
					type="text"
					icon="BsPersonBadge"
					{...register('username', {
						required: {
							value: isEditUsername,
							message: 'This field is required',
						},
						minLength: isEditUsername
							? {
									value: 3,
									message: 'This field must be at min 3 characters',
							  }
							: 0,
					})}
				/>
				{dataSlug && (
					<p
						style={{
							color: `${dataSlug.data.access ? 'green' : 'red'}`,
							marginBottom: '20px',
						}}
					>
						{dataSlug.data.message}
					</p>
				)}
			</Accordion>
			<Accordion
				isOpen={isEditAvatar}
				setIsOpen={setIsEditAvatar}
				title="Change avatar"
			>
				<Controller
					name="avatarPath"
					control={control}
					defaultValue={String(user?.avatarPath)}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<UploadField
							onChange={onChange}
							folder="users"
							placeholder="Avatar"
							error={error}
							image={value}
						/>
					)}
				/>
			</Accordion>
			<button type="submit">Update</button>
		</form>
	)
}

export default EditForm
