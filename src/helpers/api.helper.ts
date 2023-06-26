export const ReturnError = (error: any): string =>
	error.response && error.response.data
		? typeof error.response.data.message === 'object'
			? error.response.data.message[0]
			: error.response.data.message
		: error.message

export const GetAuthUrl = (path: string) => `/auth${path}`
export const GetUsersUrl = (path: string) => `/users${path}`
export const GetProductsUrl = (path: string) => `/products${path}`
