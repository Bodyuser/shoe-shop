import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { useAuth } from '@/hooks/useAuth'
import { useDebounce } from '@/hooks/useDebounce'

import { IInputUpdateProfile } from '@/shared/types/users/input.types'

import { UsersService } from '@/services/users/users.service'

import { ToastError } from '@/utils/ToastrError'

import { IEditProfile } from '../editProfile.interface'

export const useEditProfile = () => {
	const { user } = useAuth()
	const [isEditEmail, setIsEditEmail] = useState(false)
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		reset,
		control,
		watch,
	} = useForm<IEditProfile>({
		mode: 'onChange',
	})
	const { replace } = useRouter()
	useEffect(() => {
		if (user) {
			setValue('email', String(user?.email))
			setValue('name', String(user?.name))
			setValue('username', String(user?.username))
		}
	}, [user])
	const { mutateAsync } = useMutation(
		'update profile',
		(data: IInputUpdateProfile) => UsersService.UpdateProfile(data),
		{
			onError(error) {
				ToastError(error, 'Update profile')
			},
			onSuccess() {
				toastr.success('Update profile', 'Update was successful')
			},
		}
	)
	const [username, setUsername] = useState('')
	const debounceValue = useDebounce(username, 500)
	const { mutateAsync: checkSlug, data: dataSlug } = useMutation(
		'check username',
		(text: string) => UsersService.CheckExistingSlug(text)
	)
	useEffect(() => {
		const subs = watch((value) => setUsername(String(value.username)))
		return () => subs.unsubscribe()
	}, [watch])
	useEffect(() => {
		const CheckSlug = async () => {
			if (debounceValue.length > 3 && user?.username !== username) {
				await checkSlug(debounceValue)
			}
		}
		CheckSlug()
	}, [debounceValue])
	const onSubmit: SubmitHandler<IEditProfile> = async (data) => {
		try {
			if (data.email !== user?.email && !data.code) {
				setIsEditEmail(true)
			} else {
				await mutateAsync(data)
				reset()
				replace('/profile')
			}
		} catch (error) {
			console.log('Error')
		}
	}
	return {
		onSubmit,
		handleSubmit,
		register,
		errors,
		isEditEmail,
		control,
		dataSlug,
	}
}
