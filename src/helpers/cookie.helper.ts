import Cookies from 'js-cookie'

export const SaveToken = async (token: string) => {
	await Cookies.set('accessToken', token)
}

export const RemoveToken = async () => {
	await Cookies.remove('accessToken')
}
