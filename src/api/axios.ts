import axios from 'axios'
import Cookies from 'js-cookie'

import { AuthService } from '@/services/auth/auth.service'

import { API_URL } from '@/constants/api.constants'
import { ReturnError } from '@/helpers/api.helper'
import { RemoveToken } from '@/helpers/cookie.helper'

export const instance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

instance.interceptors.request.use((config) => {
	const accessToken = Cookies.get('accessToken')
	if (accessToken && config.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

instance.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config
		if (
			(error.response.status === 401 ||
				ReturnError(error) === 'jwt expired' ||
				ReturnError(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.GetNewTokens()
				return instance.request(originalRequest)
			} catch (e) {
				if (ReturnError(e) === 'jwt expired') await RemoveToken()
				console.log('Error')
			}
		}

		throw error
	}
)

export default instance
