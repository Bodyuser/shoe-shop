import axios from 'axios';



import { API_URL } from './../constants/api.constants';


export const axiosClassic = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'venerable-cascaron-f5e9d5.netlify.app',
	},
})