import { IUser } from '@/shared/types/users/user.types'

export interface IEditProfile
	extends Pick<
		IUser,
		'avatarPath' | 'name' | 'email' | 'username' | 'password' | 'code'
	> {
	currentPassword: string
}
