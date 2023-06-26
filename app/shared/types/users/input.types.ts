import { UserRole } from '@/shared/enum/userRole.enum'

export interface IInputUpdateProfile {
	email?: string
	currentPassword?: string
	password?: string
	avatarPath?: string
	name?: string
	username?: string
	code?: number
}
export interface IInputUpdateUser {
	email: string
	role: UserRole
	password: string
	avatarPath: string
	name: string
	isActivated: boolean
	slug: string
}
