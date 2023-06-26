import {
	IDataResponseForResetPassword,
	IDataResponseForSignIn,
	IDataResponseForSignUp,
	IDataResponseForToken,
} from '@/shared/types/services/auth.types'

import { axiosClassic } from '@/api/axiosClassic'
import { GetAuthUrl } from '@/helpers/api.helper'
import { SaveToken } from '@/helpers/cookie.helper'

export const AuthService = {
	async SignUp(email: string, password: string, name: string) {
		const response = await axiosClassic.post<IDataResponseForSignUp>(
			`${GetAuthUrl('/signup')}`,
			{
				email,
				password,
				name,
			}
		)
		if (response.data.token) {
			await SaveToken(response.data.token)
		}
		return response.data
	},
	async SignIn(email: string, password: string) {
		const response = await axiosClassic.post<IDataResponseForSignIn>(
			`${GetAuthUrl('/signin')}`,
			{
				email,
				password,
			}
		)
		if (response.data.token) {
			await SaveToken(response.data.token)
		}
		return response.data
	},
	async LogOut() {
		await axiosClassic.get(`${GetAuthUrl('/logout')}`)
		return
	},
	async GetNewTokens() {
		const response = await axiosClassic.get<IDataResponseForToken>(
			`${GetAuthUrl('/token')}`
		)
		if (response.data.token) {
			await SaveToken(response.data.token)
		}
		return response.data
	},
	async ResetPassword(resetLink: string, password: string) {
		const response = await axiosClassic.post<IDataResponseForResetPassword>(
			GetAuthUrl(`/reset/${resetLink}`),
			{
				password,
			}
		)
		return response.data.message
	},
	async CheckResetLink(resetLink: string) {
		const response = await axiosClassic.get<{ message: string }>(
			GetAuthUrl(`/reset/${resetLink}`)
		)
		return response.data.message
	},
}
