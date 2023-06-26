import axios from 'axios'

import { API_URL } from './../constants/api.constants'

export const axiosClassic = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})
