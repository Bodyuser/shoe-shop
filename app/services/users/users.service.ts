import { IInputUpdateProfile } from '@/shared/types/users/input.types'
import { IGlobalUser, IUserProfile } from '@/shared/types/users/user.types'

import axios from '@/api/axios'
import { axiosClassic } from '@/api/axiosClassic'
import { GetUsersUrl } from '@/helpers/api.helper'

interface IProfileResponse {
	user: IUserProfile
}

export const UsersService = {
	async GetAllUsers(searchTerm?: string) {
		const response = await axiosClassic.get<IGlobalUser[]>(GetUsersUrl(''), {
			params: {
				searchTerm: searchTerm ? searchTerm : '',
			},
		})
		return response.data
	},
	async GetUserByUsername(username: string) {
		return await axiosClassic.get<IGlobalUser>(GetUsersUrl(`/${username}`))
	},
	async GetProfile() {
		const user = await axios.get<IProfileResponse>(GetUsersUrl('/profile'))
		return user.data
	},
	async UpdateProfile(data: IInputUpdateProfile) {
		const user = await axios.put<IProfileResponse>(
			GetUsersUrl('/profile'),
			data
		)
		return user.data
	},
	async DeleteProfile() {
		return await axios.delete(GetUsersUrl('/profile'))
	},
	async ActivatedUser(activateLink: string) {
		return await axios.get(GetUsersUrl(`/activate/${activateLink}`))
	},
	async CheckExistingSlug(username: string) {
		return await axios.get(GetUsersUrl('/existing-username'), {
			params: {
				username,
			},
		})
	},
}
